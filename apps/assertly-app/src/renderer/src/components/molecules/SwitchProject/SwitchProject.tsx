import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { DialogHeader } from '@renderer/components/ui/dialog'
import { RiRefreshLine } from 'react-icons/ri'

const SwitchProject = () => {
  return (
    <>
      <DialogTrigger>
        <div className="flex items-center">
          <RiRefreshLine className="mr-2" />
          Switch Project
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </>
  )
}

export default SwitchProject
