import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import SidebarNavItem from './SidebarNavItem'
import {
  RiListCheck3,
  RiSettings2Line,
  RiVideoLine,
  RiFlaskLine,
  RiCloudLine,
  RiFolder2Line,
  RiStockLine,
  RiSunFill,
  RiMoonClearLine
} from 'react-icons/ri'
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
import { projectsAtom, selectedProjectIdAtom } from '@renderer/store/projects/projects'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { isDarkMode } from '@renderer/store/app/app'

const Sidebar = () => {
  const [darkMode, setDarkMode] = useAtom(isDarkMode)
  const [currentUserNameAndEmail] = useAtom(currentUserNameAndEmailAtom)
  const [projects] = useAtom(projectsAtom)
  const [selectedProjectId] = useAtom(selectedProjectIdAtom)
  const [, setAuthState] = useAtom(authAtom)

  const handleLogout = () => {
    setAuthState(null)
  }

  console.log('projects', projects)
  console.log('selectedProjectId', selectedProjectId)

  return (
    <div className="fixed inset-y-0 left-0 w-[200px] h-[calc(100vh)] overflow-y-hidden z-50">
      <nav className="flex h-full min-h-0 flex-col">
        <div className="w-full h-14 custom-drag-region"></div>
        <div className="flex flex-col px-4 mb-4 pb-4 border-b border-zinc-950/5  dark:border-white/5">
          <div className="flex gap-3 h-14 p-2 items-center justify-start cursor-pointer bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700/50">
            <div className="flex">
              <span
                data-slot="avatar"
                className="h-8 w-8 inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity] rounded-full *:rounded-full"
              >
                <img src="/project-cover.png" alt="Richpanel" className="size-full" />
              </span>
            </div>
            <div className="flex flex-col flex-1 h-ful justify-start items-start">
              <span className="text-sm font-medium dark:text-zinc-200 truncate">Acme Inc.</span>
              <span className="text-xs dark:text-zinc-500">default-project</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div data-slot="section" className="flex flex-col gap-2 px-4">
            <SidebarNavItem to="tests" icon={<RiFlaskLine />} title="Tests" />
            <SidebarNavItem to="test-suits" icon={<RiFolder2Line />} title="Test Suits" />
            <SidebarNavItem to="runs" icon={<RiListCheck3 />} title="History" />
            <SidebarNavItem to="analytics" icon={<RiStockLine />} title="Analytics" />
            <SidebarNavItem to="session-recordings" icon={<RiVideoLine />} title="Sessions Rec." />
            <SidebarNavItem to="environments" icon={<RiCloudLine />} title="Environments" />
            <SidebarNavItem to="settings" icon={<RiSettings2Line />} title="Settings" />
          </div>
          <div className="flex-1 custom-drag-region"></div>
        </div>
        <div className="flex">
          <Tabs defaultValue={darkMode ? 'dark' : 'light'} className="w-full flex px-2">
            <TabsList className="bg-zinc-200 flex-1 flex">
              <TabsTrigger
                value="light"
                className="flex-1"
                onClick={() => {
                  {
                    setDarkMode(false)
                    // @ts-ignore
                    window?.colorMode?.light()
                  }
                }}
              >
                <RiSunFill className="mr-2" />
                Light
              </TabsTrigger>
              <TabsTrigger
                value="dark"
                className="flex-1"
                onClick={() => {
                  {
                    setDarkMode(true)
                    // @ts-ignore
                    window?.colorMode?.dark()
                  }
                }}
              >
                <RiMoonClearLine className="mr-2" />
                Dark
              </TabsTrigger>
            </TabsList>
          </Tabs>
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
