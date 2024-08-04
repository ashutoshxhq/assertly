import {columns} from "./columns"
import {teamMembers} from "./data.ts"
import { DataTable } from "src/components/molecules/Datatable/Datatable"


const TeamMembers = () => {
  return (
    <div>
    <DataTable columns={columns} data={teamMembers}></DataTable>
    </div>
  )
}

export default TeamMembers
