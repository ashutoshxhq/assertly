import { RiAddLargeLine, RiListCheck3 } from "react-icons/ri"
import { Button } from "src/components/ui/button"
import { DataTable } from "./TestRunsTable/data-table"
import { columns } from "./TestRunsTable/columns"
import { testRuns } from "./TestRunsTable/data"

const TestRuns = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl">
            <RiListCheck3 />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Test Runs</h2>
            <p className="text-neutral-500 text-sm">Manage your test run history</p>
          </div>
        </div>

        <div className="flex items-center mt-0">
          <Button variant={"brand"} className="bg-orange-500 mt-0"><RiAddLargeLine className="mx-2" />New Test Run</Button>
        </div>
      </div>
      <div className="border-b border-neutral-900 my-8 mx-2"></div>
      <div className="bg-neutral-900 rounded-md">
        <div className="bg-neutral-800/50 h-4 rounded-t-md"></div>
        <DataTable columns={columns} data={testRuns} />
        <div className="bg-neutral-800/50 h-8 rounded-b-md"></div>
      </div>
    </div>
  )
}

export default TestRuns