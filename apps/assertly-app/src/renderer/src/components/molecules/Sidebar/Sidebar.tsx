import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import SidebarNavItem from './SidebarNavItem'
import { RiListCheck3, RiSettings2Line, RiAppsLine, RiChat1Line, RiDatabase2Line } from 'react-icons/ri'
import { useAtom } from 'jotai'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { authAtom } from '@renderer/store/auth/auth'
import { currentUserNameAtom } from '@renderer/store/users/users'

const Sidebar = () => {
  const [currentUserName] = useAtom(currentUserNameAtom)
  const [, setAuthState] = useAtom(authAtom)

  const handleLogout = () => {
    setAuthState(null)
  }

  return (
    <div className="fixed inset-y-0 left-0 w-[70px] h-[calc(100vh)] overflow-y-hidden z-50 custom-drag-region">
      <nav className="flex h-full min-h-0 flex-col custom-drag-region">
        <div className="flex flex-col p-4 my-4">
          <span
            className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -tranzinc-x-1/2 -tranzinc-y-1/2 [@media(pointer:fine)]:hidden"
            aria-hidden="true"
          ></span>
          <span
            data-slot="avatar"
            className="inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity] rounded-full *:rounded-full"
          >
            <img className="size-full" src="/catalyst.svg" alt="" />
          </span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto [&amp;>[data-slot=section]+[data-slot=section]]:mt-8 custom-drag-region">
          <div data-slot="section" className="flex flex-col gap-2 p-4 custom-drag-region">
            <SidebarNavItem to="explore" icon={<RiChat1Line />} title="Explore" />
            <SidebarNavItem to="applications" icon={<RiAppsLine />} title="Applications" />
            <SidebarNavItem to="runs" icon={<RiListCheck3 />} title="Test Runs" />
            <SidebarNavItem to="knowledge" icon={<RiDatabase2Line />} title="Knowledge" />
            <SidebarNavItem to="settings" icon={<RiSettings2Line />} title="Settings" />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 border-t border-zinc-950/5  dark:border-white/5 [&amp;>[data-slot=section]+[data-slot=section]]:mt-2.5 custom-drag-region">
          {/* <SidebarButtons
                        action={() => {}}
                        icon={<RiAddLargeLine />}
                        title="Create"
                    />
                    <SidebarButtons
                        action={() => {}}
                        icon={<RiCommandLine />}
                        title="Search"
                    /> */}
          <div className="flex items-center justify-center rounded-full mt-4 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback className="bg-orange-300 dark:bg-orange-300">
                    {currentUserName?.firstname?.charAt(0) || 'X'}
                  </AvatarFallback>
                </Avatar>
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
