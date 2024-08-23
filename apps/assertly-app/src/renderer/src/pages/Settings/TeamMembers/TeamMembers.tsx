import { columns } from './columns'
import { teamMembers } from './data'
import { DataTable } from '@renderer/components/molecules/Datatable/Datatable'

const TeamMembers = () => {
  return (
    <div>
      <DataTable columns={columns} data={teamMembers}></DataTable>
    </div>
  )
}

export default TeamMembers
