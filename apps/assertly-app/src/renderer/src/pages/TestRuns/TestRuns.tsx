import { RiAddLargeLine, RiListCheck3 } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'
import { columns } from './columns'
import { DataTable } from '@renderer/components/molecules/Datatable/Datatable'

const TestRuns = () => {
  return (
    <div className="flex flex-col gap-4 p-12 py-6">
      <div className="flex flex-col bg-white dark:bg-zinc-800/50 p-8 rounded-xl shadow-sm gap-8 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-4xl">
              <RiListCheck3 />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight">Test Run History</h2>
              <p className="dark:text-zinc-500 text-sm">Manage your test run history</p>
            </div>
          </div>

          <div className="flex items-center mt-0">
            <Button variant={'brand'} className="bg-orange-500 mt-0">
              <RiAddLargeLine className="mx-2" />
              New Test Run
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-4">
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  )
}

export default TestRuns
