import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import { toast } from 'sonner'
import { WEBDRIVER_SERVICE_URL } from '@renderer/config/constants'
import {
  currentRunningStepIdAtom,
  currentTestSpecExecutionHtmlContentAtom,
  currentTestSpecExecutionLogsAtom,
  currentTestSpecExecutionNetworkLogsAtom,
  currentTestSpecExecutionPageURLAtom,
  currentTestSpecExecutionScreenshotAtom,
  isTestSpecRunningAtom,
  Step,
  testSpecExecutedStepIdsAtom,
  testSpecStepsAtom
} from '@renderer/store/test-specs/steps'
import { v4 } from 'uuid'

export const useWebdriver = () => {
  const clientIdRef = useRef(v4())
  const [steps, setSteps] = useAtom(testSpecStepsAtom)
  const [, setTestSpecExecutedStepIds] = useAtom(testSpecExecutedStepIdsAtom)
  const [, setIsStepsRunning] = useAtom(isTestSpecRunningAtom)
  const [, setCurrentRunningStepId] = useAtom(currentRunningStepIdAtom)
  const [, setLastPageContent] = useAtom(currentTestSpecExecutionHtmlContentAtom)
  const [, setLastPageScreenshot] = useAtom(currentTestSpecExecutionScreenshotAtom)

  const [, setcurrentTestSpecExecutionLogs] = useAtom(currentTestSpecExecutionLogsAtom)

  const [, setcurrentTestSpecExecutionNetworkLogs] = useAtom(currentTestSpecExecutionNetworkLogsAtom)
  const [, setLastPageURL] = useAtom(currentTestSpecExecutionPageURLAtom)

  const websocketUrl = useMemo(() => WEBDRIVER_SERVICE_URL + '?clientId=' + clientIdRef.current, [])
  const { sendMessage, lastMessage } = useWebSocket(websocketUrl)

  const handleWebSocketMessage = useCallback(
    (message: any) => {
      const parsedData = JSON.parse(message.data)
      switch (parsedData.event) {
        case 'ACTION_RESULT':
          if (parsedData.data) {
            if (parsedData?.data?.step?.result?.assertion_result === false) {
              toast.error(parsedData.data.step.result.reason, {
                dismissible: false,
                duration: 20000
              })
            }
            let stepStatus = 'success'
            let stepReason = ''
            if (parsedData?.data?.step?.result) {
              if (parsedData.data.step.result?.assertion_result === false) {
                stepStatus = 'failure'
              }
              stepReason = parsedData.data.step.result.reason
            }
            // update step status to success or failure
            setSteps((prev) => {
              return prev.map((step) =>
                step.id === parsedData.data.step.id
                  ? {
                      ...step,
                      status: stepStatus,
                      reason: stepReason
                    }
                  : step
              )
            })
            setLastPageURL((prev) => {
              if (prev !== parsedData.data.url) {
                return parsedData.data.url
              }
              return prev
            })
            setLastPageScreenshot((prev) => {
              if (prev !== parsedData.data.screenshot) {
                return parsedData.data.screenshot
              }
              return prev
            })
            setTestSpecExecutedStepIds((prev) => {
              if (!prev.includes(parsedData.data.step.id)) {
                return [...prev, parsedData.data.step.id]
              }
              return prev
            })
            setCurrentRunningStepId(parsedData.data.nextStepId)
          }
          break
        case 'SELECTOR_UPDATE':
          if (parsedData.data.props.selector) {
            setSteps((prev) => {
              return prev.map((step) =>
                step.id === parsedData.data.id
                  ? {
                      ...step,
                      props: {
                        ...step.props,
                        selector: parsedData.data.props.selector
                      }
                    }
                  : step
              )
            })
          }
          break
        case 'ACTIONS_COMPLETED':
          setCurrentRunningStepId('')
          setIsStepsRunning(false)
          break
        case 'SCREENSHOT':
          setLastPageScreenshot(parsedData.data)
          break
        case 'CONSOLE_LOG':
          setcurrentTestSpecExecutionLogs((prev) => [...prev, parsedData.data])
          break
        case 'NETWORK_REQUEST':
          setcurrentTestSpecExecutionNetworkLogs((prev) => [
            ...prev,
            {
              request: {
                url: parsedData.data.url,
                method: parsedData.data.method,
                headers: parsedData.data.headers,
                body: parsedData.data.body
              }
            }
          ])
          break
        case 'NETWORK_RESPONSE':
          setcurrentTestSpecExecutionNetworkLogs((prev) => [
            ...prev.map((log) =>
              log.request.url === parsedData.data.url ? { ...log, response: { ...parsedData.data } } : log
            )
          ])
          break
        case 'ERROR':
          console.error(parsedData.data)
          toast.error(parsedData.data.message)
          // update step status to failure
          if (parsedData.data.step) {
            setSteps((prev) => {
              return prev.map((step) =>
                step.id === parsedData.data.step.id
                  ? {
                      ...step,
                      status: 'failure',
                      stepExecutionReason: parsedData.data.message
                    }
                  : step
              )
            })
          }
          setCurrentRunningStepId('')
          setIsStepsRunning(false)
          setTestSpecExecutedStepIds([])

          break
      }
    },
    [setLastPageURL, setLastPageContent, setLastPageScreenshot, setTestSpecExecutedStepIds, setSteps, setIsStepsRunning]
  )

  useEffect(() => {
    return () => {
      setSteps([])
      setTestSpecExecutedStepIds([])
      setLastPageURL('about:blank')
      setLastPageContent('')
      setLastPageScreenshot('')
      setcurrentTestSpecExecutionLogs([])
      setcurrentTestSpecExecutionNetworkLogs([])
    }
  }, [])

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        handleWebSocketMessage(lastMessage)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }
  }, [lastMessage, handleWebSocketMessage])

  useEffect(() => {
    return () => {
      setSteps([])
      setTestSpecExecutedStepIds([])
    }
  }, [setSteps, setTestSpecExecutedStepIds])

  const runAllSteps = useCallback(() => {
    setIsStepsRunning(true)
    steps.length > 0 && setCurrentRunningStepId(steps[0].id)
    const message = {
      event: 'ACTIONS',
      data: {
        actions: steps.map((step: Step) => ({
          id: step.id,
          type: step.type,
          props: step.props
        }))
      }
    }
    sendMessage(JSON.stringify(message))
  }, [steps, sendMessage, setIsStepsRunning])

  const runStepById = useCallback(
    (stepId: string) => {
      setCurrentRunningStepId(stepId)
      const step = steps.find((step: Step) => step.id === stepId)
      if (!step) {
        toast.error('Step not found to run')
        return
      }
      const message = {
        event: 'ACTIONS',
        data: {
          actions: [
            {
              id: step.id,
              type: step.type,
              props: step.props
            }
          ]
        }
      }
      sendMessage(JSON.stringify(message))
    },
    [steps, sendMessage]
  )

  const cancelActions = useCallback(() => {
    const message = {
      event: 'CANCEL_ACTIONS',
      data: {}
    }
    sendMessage(JSON.stringify(message))
  }, [steps, sendMessage])

  return {
    runAllSteps,
    runStepById,
    cancelActions
  }
}
