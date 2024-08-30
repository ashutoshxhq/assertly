import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './components/molecules/Sidebar/Sidebar'
import { selectedProjectIdAtom } from './store/projects/projects'
import { useAtom } from 'jotai'
import { cn } from './lib/utils'

function ApplicationWithSidebarLayout() {
  const [selectedProjectId] = useAtom(selectedProjectIdAtom)
  const navigate = useNavigate()

  if (selectedProjectId === '') {
    navigate('/projects')
  }

  console.log('selectedProjectId', selectedProjectId)

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-1 w-full ">
        <div className="relative isolate flex w-full bg-white dark:bg-zinc-900 ">
          {selectedProjectId && <Sidebar />}
          <main className={cn('flex flex-1 flex-col min-w-0', selectedProjectId && 'p-3 pl-[200px]')}>
            <div className="grow rounded-lg shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-950/4 bg-zinc-200/50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 h-[calc(100vh-24px)] overflow-y-scroll">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ApplicationWithSidebarLayout
