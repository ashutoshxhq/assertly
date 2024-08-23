import { RiArrowLeftSLine, RiFlaskLine, RiHashtag, RiListCheck3, RiSettings3Line } from 'react-icons/ri'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import TestSpecs from './TestSpecs/TestSpecs'
import Modules from './Modules/Modules'
import TestRuns from './ApplicationTestRuns/ApplicationTestRuns'
import ApplicationSettings from './ApplicationSettings/ApplicationSettings'
import { CreateTestSpec } from './TestSpecs/TestSpec/CreateTestSpec'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@renderer/components/ui/button'
import { useAtom } from 'jotai'
import { selectedApplicationAtom } from '@renderer/store/applications/applications'

const Application = () => {
  const navigate = useNavigate()
  const [selectedApplication] = useAtom(selectedApplicationAtom)

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-12 py-2 pt-4">
        <div className="flex w-[33.33%] gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/applications')}
            className="mx-0 px-0 pr-4 pl-2 text-sm shadow-sm border border-zinc-200 dark:border-zinc-800"
          >
            {' '}
            <RiArrowLeftSLine className="text-xl" />
            <span className="text-sm">Back to application</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="tests" className="w-full">
        <div className="flex flex-col py-2 px-12">
          <div className="flex flex-col bg-white dark:bg-zinc-800/50 p-8 pb-4 rounded-xl shadow-sm gap-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="flex gap-1">
                  <Link
                    to="/applications"
                    className="text-2xl tracking-tight text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-300"
                  >
                    applications
                  </Link>
                  <h2 className="text-2xl font-bold tracking-tight ">/ {selectedApplication.data?.name}</h2>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Manage all your test specs, modules, test suits and test runs here.
                </p>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-end gap-2">
                  <CreateTestSpec />
                </div>
              </div>
            </div>
            <div className="flex">
              <TabsList className="bg-zinc-200">
                <TabsTrigger value="tests">
                  <RiFlaskLine className="mr-2" />
                  Tests
                </TabsTrigger>
                <TabsTrigger value="modules">
                  <RiHashtag className="mr-2" />
                  Modules
                </TabsTrigger>
                <TabsTrigger value="test-runs">
                  <RiListCheck3 className="mr-2" />
                  Test Runs
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <RiSettings3Line className="mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="tests">
            <TestSpecs />
          </TabsContent>
          <TabsContent value="modules">
            <Modules />
          </TabsContent>
          <TabsContent value="test-runs">
            <TestRuns />
          </TabsContent>
          <TabsContent value="settings">
            <ApplicationSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Application
