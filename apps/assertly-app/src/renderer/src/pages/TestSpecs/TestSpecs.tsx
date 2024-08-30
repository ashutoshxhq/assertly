import { DataTable } from '@renderer/components/molecules/Datatable/Datatable'
import { testSpecsAtom } from '@renderer/store/test-specs/testSpecs'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import { selectedProjectIdAtom } from '@renderer/store/projects/projects'
import { useEffect } from 'react'
import { CreateTestSpec } from './TestSpec/CreateTestSpec'
import { RiFlaskLine } from 'react-icons/ri'
import { columns } from './columns'
import { Helmet } from 'react-helmet'

const TestSpecs = () => {
  const { projectId } = useParams()
  const [{ data }] = useAtom(testSpecsAtom)
  const [, setsSelectedProjectIdAtom] = useAtom(selectedProjectIdAtom)

  useEffect(() => {
    if (projectId) setsSelectedProjectIdAtom(projectId)
  }, [projectId])

  return (
    <div className="py-4">
      <Helmet>
        <title>Tests | Assertly</title>
      </Helmet>
      <div className="flex flex-col py-2 px-12 gap-4">
        <div className="flex flex-col bg-white dark:bg-zinc-800/50 p-8 rounded-xl shadow-sm gap-8 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-4xl">
                <RiFlaskLine />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Tests</h2>
                <p className="dark:text-zinc-500 text-sm">Manage your tests here</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-end gap-2">
                <CreateTestSpec />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-4">
          <DataTable columns={columns} data={(data || []) as any} />
        </div>
      </div>
    </div>
  )
}

export default TestSpecs
