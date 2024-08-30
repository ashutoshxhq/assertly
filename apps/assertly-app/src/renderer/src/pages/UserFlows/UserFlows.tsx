import { RiAddLargeLine, RiHashtag } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'
import { columns } from './UserFlowTable/columns'
import { userFlows } from './UserFlowTable/data'
import { DataTable } from '@renderer/components/molecules/Datatable/Datatable'
import { Helmet } from 'react-helmet'

const UserFlows = () => {
  return (
    <div className="p-8">
      <Helmet>
        <title>User Flows | Assertly</title>
      </Helmet>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl">
            <RiHashtag />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">User Flows</h2>
            <p className="dark:text-zinc-500 text-sm">Manage all your user flows</p>
          </div>
        </div>

        <div className="flex items-center mt-0">
          <Button variant={'brand'} className="bg-orange-500 mt-0">
            <RiAddLargeLine className="mx-2" />
            New User Flow
          </Button>
        </div>
      </div>
      <div className="border-b dark:border-zinc-900 my-8 mx-2"></div>
      <div className="bg-white dark:bg-zinc-800/50 shadow border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
        <DataTable columns={columns} data={userFlows} />
      </div>
    </div>
  )
}

export default UserFlows
