import { RiAddLargeLine, RiKeyLine } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'

const ApiKeys = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl">
            <RiKeyLine />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Api Keys</h2>
            <p className="dark:text-zinc-500 text-sm">Manage your api keys here.</p>
          </div>
        </div>

        <div className="flex items-center mt-0">
          <Button variant={'brand'} className="bg-orange-500 mt-0">
            <RiAddLargeLine className="mx-2" />
            Create New Credential
          </Button>
        </div>
      </div>
      <div className="border-b dark:border-zinc-900 my-8 mx-2"></div>

      <div className="dark:bg-zinc-900 rounded-md"></div>
    </div>
  )
}

export default ApiKeys
