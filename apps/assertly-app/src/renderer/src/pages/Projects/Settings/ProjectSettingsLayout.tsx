import { RiBellLine, RiOrganizationChart } from 'react-icons/ri'
import { GoWorkflow } from 'react-icons/go'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Helmet } from 'react-helmet'
import Notification from '@renderer/pages/Settings/Notification/Notification'
import ApiKeys from './ApiKeys/ApiKeys'
import ProjectSettings from './ProjectSettings/ProjectSettings'

const ProjectSettingsLayout = () => {
  return (
    <div className="p-12">
      <Helmet>
        <title>Project Settings | Assertly</title>
      </Helmet>
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          </div>
        </div>
      </div>
      <Tabs defaultValue="project" className="w-full p-4">
        <TabsList className="bg-zinc-200">
          <TabsTrigger value="project">
            <RiOrganizationChart className="mr-2" />
            Project
          </TabsTrigger>
          <TabsTrigger value="api-keys">
            <GoWorkflow className="mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiBellLine className="mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
        <div className="border-b-2 dark:border-zinc-900 my-4 mx-2"></div>
        <TabsContent value="project">
          <ProjectSettings />
        </TabsContent>
        <TabsContent value="api-keys">
          <ApiKeys />
        </TabsContent>
        <TabsContent value="notifications">
          <Notification />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectSettingsLayout
