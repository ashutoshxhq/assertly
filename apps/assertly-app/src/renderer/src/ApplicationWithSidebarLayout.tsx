import { Outlet } from 'react-router-dom'
import Sidebar from './components/molecules/Sidebar/Sidebar'

function ApplicationWithSidebarLayout() {
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-1 w-full ">
        <div className="relative isolate flex w-full bg-white dark:bg-zinc-900 ">
          <Sidebar />
          <main className="flex flex-1 flex-col pb-3 min-w-0 pl-[200px] pr-3 pt-3">
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
