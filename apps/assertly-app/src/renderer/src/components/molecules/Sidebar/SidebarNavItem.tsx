import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { cn } from '@renderer/lib/utils'

export interface SidebarNavItemProps {
  icon: ReactNode
  title: string
  to: string
}

const SidebarNavItem = ({ icon, title, to }: SidebarNavItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="relative">
                {/* {isActive && <span className="absolute inset-y-2 -left-4 w-1 rounded-full dark:bg-zinc-950 dark:bg-white"></span>} */}
                <div
                  className={cn(
                    'flex w-full px-4 py-2 items-center justify-start gap-3 rounded-lg text-left text-base/6 font-medium text-zinc-950 border border-transparent dark:text-white hover:bg-zinc-800/5 dark:hover:bg-white/5',
                    isActive &&
                      'bg-zinc-200 dark:bg-zinc-800 border border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  )}
                >
                  <span className={cn('text-2xl', !isActive && 'dark:text-zinc-400')}>{icon}</span>
                  <span className={cn('truncate', !isActive && 'dark:text-zinc-200')}>{title}</span>
                </div>
              </span>
            </TooltipTrigger>
            <TooltipContent align="center" side="right" className="">
              <span className="dark:text-zinc-800 font-medium text-md">{title}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </NavLink>
  )
}

export default SidebarNavItem
