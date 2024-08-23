import { NetworkLog } from '@renderer/store/test-specs/steps'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@renderer/components/ui/collapsible'
import { useState, useRef, useEffect } from 'react'

const NetworkLogContent = ({ log }: { log: NetworkLog }) => {
  return (
    <div className="flex flex-col gap-2 text-xs p-2 mt-2 border-t">
      <div className="flex flex-col gap-2 mt-1 break-all overflow-x-auto">
        <span className="font-semibold">Request URL: </span>
        <p>{log.request.url}</p>
      </div>
      {log.request.headers && (
        <div>
          <span className="font-semibold">Request Headers: </span>
          <pre className="mt-1 whitespace-pre-wrap break-all overflow-x-auto">
            {JSON.stringify(log.request.headers, null, 2)}
          </pre>
        </div>
      )}
      {log.request.body && (
        <div>
          <span className="font-semibold">Body: </span>
          <pre className="mt-1 whitespace-pre-wrap break-all overflow-x-auto">
            {JSON.stringify(log.request.body || '', null, 2)}
          </pre>
        </div>
      )}
      {log?.response?.headers && (
        <div>
          <span className="font-semibold">Response Headers: </span>
          <pre className="mt-1 whitespace-pre-wrap break-all overflow-x-auto">
            {JSON.stringify(log.response.headers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

const NetworkLogItem = ({ log }: { log: NetworkLog }) => {
  const [isOpen, setIsOpen] = useState(false)
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500'
    if (status >= 400) return 'text-red-500'
    return 'text-yellow-500'
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col py-1 px-2 text-xs bg-zinc-100 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded"
      >
        <CollapsibleTrigger className="flex text-xs py-0 w-full">
          <div className="flex flex-1 items-center justify-start w-full space-x-2 overflow-hidden">
            <span className="flex font-bold flex-shrink-0 min-w-[40px]">{log.request.method}</span>
            <span className="flex font-medium truncate flex-1 min-w-0">
              {log.request.url.slice(0, 100)}
              {log.request.url.length > 100 && '...'}
            </span>
            {log.response && (
              <span className={`font-bold ${getStatusColor(log.response.status)} flex-shrink-0 ml-2`}>
                {log.response.status}
              </span>
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NetworkLogContent log={log} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

const NetworkLogs = ({ logs }: { logs: NetworkLog[] }) => {
  const [visibleLogs, setVisibleLogs] = useState<NetworkLog[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10)
            setVisibleLogs((prev) => {
              const newLogs = [...prev]
              newLogs[index] = logs[index]
              return newLogs
            })
          }
        })
      },
      { rootMargin: '100px 0px' }
    )

    const placeholders = containerRef.current?.querySelectorAll('.log-placeholder')
    placeholders?.forEach((placeholder) => observer.observe(placeholder))

    return () => observer.disconnect()
  }, [logs])

  return (
    <div ref={containerRef} className="h-full pb-12 overflow-y-auto">
      <div className="flex flex-col gap-1">
        {logs.map((_log, index) => (
          <div key={index} className="log-placeholder" data-index={index}>
            {visibleLogs[index] && <NetworkLogItem log={visibleLogs[index]} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NetworkLogs
