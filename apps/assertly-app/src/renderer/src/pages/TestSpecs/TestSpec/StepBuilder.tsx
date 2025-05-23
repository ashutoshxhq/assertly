import { RiCloseLargeFill, RiListIndefinite, RiPlayLargeFill, RiRobot2Line } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import Steps from './Steps'
import PlannerAI from './PlannerAI'
import {
  currentRunningStepIdAtom,
  currentTestSpecExecutionLogsAtom,
  currentTestSpecExecutionNetworkLogsAtom,
  currentTestSpecExecutionPageURLAtom,
  currentTestSpecExecutionScreenshotAtom,
  isTestSpecRunningAtom,
  testSpecExecutedStepIdsAtom,
  testSpecStepsAtom
} from '@renderer/store/test-specs/steps'
import { useAtom } from 'jotai'
import { useWebdriver } from '@renderer/hooks/webdriver'

const StepBuilder = () => {
  const { runAllSteps, runStepById, cancelActions } = useWebdriver()
  const [, setTestSpecExecutedStepIds] = useAtom(testSpecExecutedStepIdsAtom)
  const [isStepsRunning, setIsStepsRunning] = useAtom(isTestSpecRunningAtom)
  const [, setSteps] = useAtom(testSpecStepsAtom)
  const [, setLastPageScreenshot] = useAtom(currentTestSpecExecutionScreenshotAtom)
  const [, setLastPageURL] = useAtom(currentTestSpecExecutionPageURLAtom)
  const [, setcurrentTestSpecExecutionLogs] = useAtom(currentTestSpecExecutionLogsAtom)

  const [, setcurrentTestSpecExecutionNetworkLogs] = useAtom(currentTestSpecExecutionNetworkLogsAtom)
  const [, setCurrentRunningStepId] = useAtom(currentRunningStepIdAtom)

  const resetHandler = () => {
    cancelActions()
    setTestSpecExecutedStepIds([])
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: undefined
      }))
    )
    setLastPageScreenshot('')
    setLastPageURL('about:blank')
    setcurrentTestSpecExecutionLogs([])
    setcurrentTestSpecExecutionNetworkLogs([])
    setCurrentRunningStepId('')
    setIsStepsRunning(false)
  }

  return (
    <div className="flex rounded-lg shadow ring-1 ring-zinc-200  dark:ring-zinc-950/4 bg-white dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 h-[calc(100vh-62px)] overflow-y-scroll">
      <Tabs defaultValue="steps" className="flex flex-col items-center justify-start w-full p-4">
        <div className="flex flex-wrap justify-between w-full gap-4">
          <div className="flex">
            <TabsList className="w-full">
              <TabsTrigger value="steps">
                {' '}
                <RiListIndefinite className="mr-2" /> Steps
              </TabsTrigger>
              <TabsTrigger value="chat">
                <RiRobot2Line className="mr-2" />
                Browser AI
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Button variant="default" size={'sm'} className="text-sm" disabled={isStepsRunning} onClick={runAllSteps}>
              {isStepsRunning ? (
                'Running...'
              ) : (
                <>
                  <RiPlayLargeFill className="text-md mr-2 text-green-500" />
                  <span className="text-sm">Run steps</span>
                </>
              )}
            </Button>
            <Button variant="outline" size={'sm'} className="text-sm" onClick={resetHandler}>
              <RiCloseLargeFill className="text-md mr-2 text-red-500" />
              <span className="text-sm">Reset</span>
            </Button>
          </div>
        </div>

        <TabsContent value="steps" className="h-full w-full overflow-y-scroll">
          <Steps runStepById={runStepById} />
        </TabsContent>
        <TabsContent value="chat" className="h-full w-full overflow-y-scroll">
          <PlannerAI />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StepBuilder
