import { ReactNode } from 'react'
import { Button } from '@renderer/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@renderer/components/ui/tooltip'

export interface SidebarButtonsProps {
  icon: ReactNode
  title: string
  action: () => void
}

const SidebarButtons = ({ icon, title, action }: SidebarButtonsProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={'ghost'} onClick={action}>
            <span className="text-[16px] dark:text-zinc-400">{icon}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent align="end" side="right" className="">
          <span className="dark:text-zinc-800 font-medium text-md">{title}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SidebarButtons
