import { RiAddLargeLine, RiHashtag } from "react-icons/ri"
import { Button } from "src/components/ui/button"
import { DataTable } from "./UserFlowTable/data-table"
import { columns } from "./UserFlowTable/columns"
import { userFlows } from "./UserFlowTable/data"

const UserFlows = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl">
            <RiHashtag />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">User Flows</h2>
            <p className="text-neutral-500 text-sm">Manage all your user flows</p>
          </div>
        </div>

        <div className="flex items-center mt-0">
          <Button variant={"brand"} className="bg-orange-500 mt-0"><RiAddLargeLine className="mx-2" />New User Flow</Button>
        </div>
      </div>
      <div className="border-b border-neutral-900 my-8 mx-2"></div>
      <div className="bg-neutral-900 rounded-md">
        <div className="bg-neutral-800/50 h-4 rounded-t-md"></div>
        <DataTable columns={columns} data={userFlows} />
        <div className="bg-neutral-800/50 h-8 rounded-b-md"></div>
      </div>
    </div>
  )
}

export default UserFlows