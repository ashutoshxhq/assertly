// Sidebar.tsx
import { useState } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { cn } from '@renderer/lib/utils'
import { isDarkMode } from '@renderer/store/app/app'
import { authAtom } from '@renderer/store/auth/auth'
import { currentUserNameAndEmailAtom } from '@renderer/store/users/users'
import { projectsAtom, selectedProjectIdAtom, selectedProjectAtom } from '@renderer/store/projects/projects'
import {
  RiSunFill,
  RiMoonClearLine,
  RiFlaskLine,
  RiFolder2Line,
  RiListCheck3,
  RiStockLine,
  RiVideoLine,
  RiCloudLine,
  RiSettings2Line,
  RiRefreshLine,
  RiAddLargeLine,
  RiTeamLine,
  RiLogoutBoxRLine,
  RiCheckLine
} from 'react-icons/ri'
import SidebarNavItem from './SidebarNavItem'

const ProjectDisplay = ({ onClick }) => {
  const [selectedProject] = useAtom(selectedProjectAtom)

  if (selectedProject.isFetching) {
    return <></>
  }

  return (
    <div
      className="flex gap-3 h-14 p-2 items-center justify-start cursor-pointer bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700/50"
      onClick={onClick}
    >
      <div className="flex">
        <span
          data-slot="avatar"
          className="h-8 w-8 inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity] rounded-full *:rounded-full"
        >
          <img src={'/project-cover.png'} alt={selectedProject.data.name} className="size-full" />
        </span>
      </div>
      <div className="flex flex-col flex-1 h-full justify-start items-start">
        <span className="text-sm font-medium dark:text-zinc-200 truncate">Acme Inc.</span>
        <span className="text-xs dark:text-zinc-500">{selectedProject.data.name}</span>
      </div>
    </div>
  )
}

const ProjectMenu = ({ onCreateProject, children }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [projects] = useAtom(projectsAtom)
  const [selectedProjectId, setSelectedProjectId] = useAtom(selectedProjectIdAtom)
  const [selectedProject] = useAtom(selectedProjectAtom)
  const [isSwitchProjectDialogOpen, setIsSwitchProjectDialogOpen] = useState(false)

  if (selectedProject.isFetching) {
    return <></>
  }

  console.log(selectedProject)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" className="min-w-48 p-2">
          <DropdownMenuLabel>
            Project: <span className="font-normal">{selectedProject.data.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="p-2 px-4 rounded-md cursor-pointer"
            onClick={() => navigate(`projects/${selectedProjectId}/settings`)}
          >
            <RiSettings2Line className="mr-2" />
            Project Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="p-2 px-4 rounded-md cursor-pointer"
            onClick={() => setIsSwitchProjectDialogOpen(true)}
          >
            <RiRefreshLine className="mr-2" />
            Switch Project
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 px-4 rounded-md cursor-pointer" onClick={onCreateProject}>
            <RiAddLargeLine className="mr-2" />
            Create New Project
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Organization</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-2 px-4 rounded-md cursor-pointer" onClick={() => navigate('settings')}>
            <RiSettings2Line className="mr-2" />
            Organization Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 px-4 rounded-md cursor-pointer">
            <RiTeamLine className="mr-2" />
            Team Members
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isSwitchProjectDialogOpen} onOpenChange={setIsSwitchProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px] top-[30%] dark:text-zinc-200">
          <DialogHeader>
            <DialogTitle>Switch Project</DialogTitle>
            <DialogDescription>Choose project you want to switch to.</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  Select a project
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="min-w-full p-0">
                <Command className="">
                  <CommandInput placeholder="Search project..." />
                  <CommandList>
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                      {projects?.data?.map((project) => (
                        <CommandItem
                          key={project.id}
                          value={project.id}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue)
                            setOpen(false)
                          }}
                        >
                          <RiCheckLine
                            className={cn('mr-2 h-4 w-4', value === project.value ? 'opacity-100' : 'opacity-0')}
                          />
                          {project.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button
              variant={'brand'}
              onClick={() => {
                setSelectedProjectId(value)
                setIsSwitchProjectDialogOpen(false)
              }}
            >
              Switch Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const UserMenu = ({ currentUserNameAndEmail, onLogout, onCreateProject }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center p-2 cursor-pointer rounded-md hover:bg-zinc-800/5 dark:hover:bg-white/5">
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
        <DropdownMenuItem onClick={onLogout}>
          <RiLogoutBoxRLine className="mr-2" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RiSettings2Line className="mr-2" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RiTeamLine className="mr-2" />
          Team Members
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCreateProject}>
          <RiAddLargeLine className="mr-2" />
          Create New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const CreateProjectDialog = ({ isOpen, onOpenChange }) => {
  const [newProjectName, setNewProjectName] = useState('')

  const handleCreateProject = () => {
    // Add logic to create a new project
    console.log('Creating project:', newProjectName)
    // Reset the input and close the dialog
    setNewProjectName('')
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Enter the name for your new project.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="projectName"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Enter project name"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Sidebar = () => {
  const [darkMode, setDarkMode] = useAtom(isDarkMode)
  const [selectedProjectId] = useAtom(selectedProjectIdAtom)
  const [currentUserNameAndEmail] = useAtom(currentUserNameAndEmailAtom)
  const [, setAuthState] = useAtom(authAtom)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  const handleLogout = () => {
    setAuthState(null)
  }

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-[200px] h-[calc(100vh)] overflow-y-hidden z-50">
        <nav className="flex h-full min-h-0 flex-col">
          <div className="w-full h-14 custom-drag-region"></div>
          <div className="flex flex-col px-4 mb-4 pb-4 border-b border-zinc-950/5 dark:border-white/5">
            <ProjectMenu onCreateProject={() => setIsCreateProjectOpen(true)}>
              <ProjectDisplay onClick={() => {}} />
            </ProjectMenu>
          </div>

          <div className="flex flex-1 flex-col">
            <div data-slot="section" className="flex flex-col gap-2 px-4">
              <SidebarNavItem to={`/projects/${selectedProjectId}/tests`} icon={<RiFlaskLine />} title="Tests" />
              <SidebarNavItem
                to={`/projects/${selectedProjectId}/test-suits`}
                icon={<RiFolder2Line />}
                title="Test Suits"
              />
              <SidebarNavItem to={`/projects/${selectedProjectId}/runs`} icon={<RiListCheck3 />} title="History" />
              <SidebarNavItem
                to={`/projects/${selectedProjectId}/analytics`}
                icon={<RiStockLine />}
                title="Analytics"
              />
              <SidebarNavItem
                to={`/projects/${selectedProjectId}/session-recordings`}
                icon={<RiVideoLine />}
                title="Sessions Rec."
              />
              <SidebarNavItem
                to={`/projects/${selectedProjectId}/environments`}
                icon={<RiCloudLine />}
                title="Environments"
              />
              <SidebarNavItem
                to={`/projects/${selectedProjectId}/settings`}
                icon={<RiSettings2Line />}
                title="Settings"
              />
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
                    setDarkMode(false)
                    // @ts-ignore
                    window?.colorMode?.light()
                  }}
                >
                  <RiSunFill className="mr-2" />
                  Light
                </TabsTrigger>
                <TabsTrigger
                  value="dark"
                  className="flex-1"
                  onClick={() => {
                    setDarkMode(true)
                    // @ts-ignore
                    window?.colorMode?.dark()
                  }}
                >
                  <RiMoonClearLine className="mr-2" />
                  Dark
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col gap-2 p-2 my-2 border-t border-zinc-950/5 dark:border-white/5">
            <UserMenu
              currentUserNameAndEmail={currentUserNameAndEmail}
              onLogout={handleLogout}
              onCreateProject={() => setIsCreateProjectOpen(true)}
            />
          </div>
        </nav>
      </div>
      <CreateProjectDialog isOpen={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen} />
    </>
  )
}
