import { columns } from './TestSpecsTable/columns'
import { DataTable } from '@renderer/components/molecules/Datatable/Datatable'
import { testSpecsAtom } from '@renderer/store/test-specs/testSpecs'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'
import { selectedApplicationIdAtom } from '@renderer/store/applications/applications'
import { useEffect } from 'react'

export type TestSpec = {
  id: string
  name: string
  pipeline: object[]
  status: 'idle' | 'running' | 'success' | 'failed'
  createdAt: string
  lastRanAt: string
  updatedAt: string
}

const TestSpecs = () => {
  const { applicationId } = useParams()
  const [{ data }] = useAtom(testSpecsAtom)
  const [, setsSelectedApplicationIdAtom] = useAtom(selectedApplicationIdAtom)

  useEffect(() => {
    if (applicationId) setsSelectedApplicationIdAtom(applicationId)
  }, [applicationId])

  return (
    <div className="py-4">
      <div className="bg-white dark:bg-zinc-800/50 shadow border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
        <DataTable columns={columns} data={(data || []) as any} />
      </div>
    </div>
  )
}

export default TestSpecs
