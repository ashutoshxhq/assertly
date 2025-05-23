import { RiBellLine, RiOrganizationChart } from 'react-icons/ri'
import { MdManageAccounts } from 'react-icons/md'
import { GoWorkflow } from 'react-icons/go'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import Account from './Account/Account'
import Integrations from './Integrations/Integrations'
import Organization from './Organization/Organization'
import Notification from './Notification/Notification'

const SettingsLayout = () => {
  return (
    <div className="p-12">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center justify-between gap-4">
          {/* <span className="text-2xl">
                        <RiSettings2Line />
                    </span> */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            {/* <p className="dark:text-zinc-500 text-sm">
                            Manage your settings
                        </p> */}
          </div>
        </div>
      </div>
      <Tabs defaultValue="organization" className="w-full p-4">
        <TabsList className="bg-zinc-200">
          <TabsTrigger value="organization">
            <RiOrganizationChart className="mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="user-profile">
            <MdManageAccounts className="mr-2" />
            User Profile
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <GoWorkflow className="mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiBellLine className="mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        <div className="border-b-2 dark:border-zinc-900 my-4 mx-2"></div>
        <TabsContent value="organization">
          <Organization />
        </TabsContent>
        <TabsContent value="user-profile">
          <Account />
        </TabsContent>
        <TabsContent value="integrations">
          <Integrations />
        </TabsContent>
        <TabsContent value="notifications">
          <Notification />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsLayout
