import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import SidebarNavItem from './SidebarNavItem'
import { RiListCheck3, RiSettings2Line, RiVideoLine, RiFlaskLine, RiHome2Line } from 'react-icons/ri'
import { useAtom } from 'jotai'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { authAtom } from '@renderer/store/auth/auth'
import { currentUserNameAndEmailAtom } from '@renderer/store/users/users'

const Sidebar = () => {
  const [currentUserNameAndEmail] = useAtom(currentUserNameAndEmailAtom)
  const [, setAuthState] = useAtom(authAtom)

  const handleLogout = () => {
    setAuthState(null)
  }

  return (
    <div className="fixed inset-y-0 left-0 w-[200px] h-[calc(100vh)] overflow-y-hidden z-50">
      <nav className="flex h-full min-h-0 flex-col">
        <div className="flex flex-col px-4 my-14 mb-8">
          <div className="flex h-14 p-2 items-center justify-start px-1 cursor-pointer bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-transparent">
            <div className="flex rounded-md h-10 w-10 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-transparent"></div>
            {/* <img className="size-full" src="/assertly.svg" alt="" /> */}
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div data-slot="section" className="flex flex-col gap-2 px-4">
            <SidebarNavItem to="dashboard" icon={<RiHome2Line />} title="Home" />
            <SidebarNavItem to="tests" icon={<RiFlaskLine />} title="Tests" />
            <SidebarNavItem to="session-recordings" icon={<RiVideoLine />} title="Sessions" />
            <SidebarNavItem to="runs" icon={<RiListCheck3 />} title="History" />
            {/* <SidebarNavItem to="knowledge" icon={<RiDatabase2Line />} title="Knowledge" /> */}
            <SidebarNavItem to="settings" icon={<RiSettings2Line />} title="Settings" />
          </div>
          <div className="flex-1 custom-drag-region"></div>
        </div>
        <div className="flex flex-col gap-2 p-2 my-2 border-t border-zinc-950/5  dark:border-white/5 [&amp;>[data-slot=section]+[data-slot=section]]:mt-2.5">
          <div className="flex items-center justify-center  p-2 cursor-pointer rounded-md hover:bg-zinc-800/5 dark:hover:bg-white/5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-1 justify-start items-center gap-4">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-orange-300 dark:bg-orange-300">
                      {currentUserNameAndEmail?.firstname?.charAt(0) || 'X'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-300">
                      {currentUserNameAndEmail?.firstname} {currentUserNameAndEmail?.lastname}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">{currentUserNameAndEmail.email}</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right">
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Integrations</DropdownMenuItem>
                <DropdownMenuItem>Team Members</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
