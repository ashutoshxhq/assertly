import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
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
import {
  selectedTestSpecAtom,
  selectedTestSpecIdAtom,
  updateTestSpecMutationAtom
} from '@renderer/store/test-specs/testSpecs'

export function EditTestSpec({ children }: { children: React.ReactNode }) {
  const [{ data }] = useAtom(selectedTestSpecAtom)
  const [testName, setTestName] = useState(data.name)
  const [open, setOpen] = useState(false)
  const [selectedTestSpecId] = useAtom(selectedTestSpecIdAtom)
  const [{ mutate, status }] = useAtom(updateTestSpecMutationAtom)

  const handleUpdate = async () => {
    try {
      mutate({
        where: {
          id: selectedTestSpecId
        },
        data: {
          name: testName
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-[30%] dark:text-zinc-200">
        <DialogHeader>
          <DialogTitle className="dark:text-zinc-200">Update Test Spec</DialogTitle>
          <DialogDescription>Update test spec details here.</DialogDescription>
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
          <Button variant={'brand'} onClick={handleUpdate}>
            {status === 'pending' ? 'Updating...' : 'Update'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
