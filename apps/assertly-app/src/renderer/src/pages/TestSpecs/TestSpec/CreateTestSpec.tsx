import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { RiAddLargeLine } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { selectedProjectIdAtom } from '@renderer/store/projects/projects'
import { teamIdAtom } from '@renderer/store/auth/auth'
import { createTestSpecAtom } from '@renderer/store/test-specs/testSpecs'

export function CreateTestSpec() {
  const [testName, setTestName] = useState('')
  const [open, setOpen] = useState(false)
  const [teamId] = useAtom(teamIdAtom)
  const [selectedProjectId] = useAtom(selectedProjectIdAtom)
  const [{ mutate, status }] = useAtom(createTestSpecAtom)

  const handleCreate = async () => {
    try {
      mutate({
        data: {
          name: testName,
          projectId: selectedProjectId,
          teamId
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (status === 'success') {
      setTestName('')
      setOpen(false)
    }
  }, [status])

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant={'brand'} className="mt-0">
          <RiAddLargeLine className="mx-2" /> Create New Test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-[30%] dark:text-zinc-200">
        <DialogHeader>
          <DialogTitle className="dark:text-zinc-200">Create New Test</DialogTitle>
          <DialogDescription>Fill in the form below to create a new test</DialogDescription>
        </DialogHeader>
        <div className="flex w-full py-4">
          <div className="flex flex-col w-full items-start gap-4">
            <Label htmlFor="name" className="text-right dark:text-zinc-200">
              Name
            </Label>
            <Input
              id="name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="col-span-3 w-full"
              placeholder="Enter test name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={'brand'} onClick={handleCreate}>
            {status === 'pending' ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
