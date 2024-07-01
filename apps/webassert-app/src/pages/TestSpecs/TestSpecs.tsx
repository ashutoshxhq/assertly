import { Button } from "src/components/ui/button"
import { columns } from "./TestSpecsTable/columns"
import { specs } from "./TestSpecsTable/data"
import { DataTable } from "./TestSpecsTable/data-table"
import { RiAddLargeLine, RiFlaskLine } from "react-icons/ri"
import { Link } from "react-router-dom"

const TestSpecs = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl">
            <RiFlaskLine />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Test Specs</h2>
            <p className="text-zinc-500 text-sm">Manage your test specs here</p>
          </div>
        </div>
        <div className="flex items-center mt-0">
          <Button asChild variant={"brand"} className="bg-orange-500 mt-0"><Link to="/specs/newspec"><RiAddLargeLine className="mx-2" /> New Test Spec</Link></Button>
        </div>
      </div>
      <div className="border-b border-zinc-900 my-8 mx-2"></div>

      <div className="bg-zinc-900 rounded-md">
        <div className="bg-zinc-800/50 h-4 rounded-t-md"></div>
        <DataTable columns={columns} data={specs} />
        <div className="bg-zinc-800/50 h-8 rounded-b-md"></div>
      </div>
    </div>
  )
}

export default TestSpecs

