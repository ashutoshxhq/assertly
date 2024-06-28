import { Avatar, AvatarFallback } from "src/components/ui/avatar";
import SidebarNavItem from "./SidebarNavItem"
import { RiListCheck3, RiSettings2Line, RiFlaskLine, RiKeyLine, RiAddLargeLine, RiCommandLine, RiFolderCloudLine, RiHashtag } from "react-icons/ri";
import SidebarButtons from "./SidebarButtons";

const Sidebar = () => (
    <div className="fixed inset-y-0 left-0 w-[70px] h-[calc(100vh)] overflow-y-hidden z-50" data-tauri-drag-region>
        <nav className="flex h-full min-h-0 flex-col" data-tauri-drag-region>
            <div className="flex flex-col p-4 mt-4">
                <span className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden" aria-hidden="true"></span><span data-slot="avatar" className="inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1 outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity] rounded-full *:rounded-full"><img className="size-full" src="/catalyst.svg" alt="" /></span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto [&amp;>[data-slot=section]+[data-slot=section]]:mt-8" data-tauri-drag-region>

                <div data-slot="section" className="flex flex-col gap-2 p-4" data-tauri-drag-region>
                    <SidebarNavItem to="specs" icon={<RiFlaskLine />} title="Test Specs" />
                    <SidebarNavItem to="runs" icon={<RiListCheck3 />} title="Test Runs" />
                    <SidebarNavItem to="user-flows" icon={<RiHashtag />} title="User Flows" />
                    <SidebarNavItem to="artifacts" icon={<RiFolderCloudLine />} title="Data & Artifacts" />
                    <SidebarNavItem to="api-keys" icon={<RiKeyLine />} title="Api Keys" />
                    <SidebarNavItem to="settings" icon={<RiSettings2Line />} title="Settings" />
                </div>

                <div aria-hidden="true" className="mt-8 flex-1" data-tauri-drag-region></div>
            </div>
            <div className="flex flex-col gap-2 p-4 border-t border-neutral-950/5  dark:border-white/5 [&amp;>[data-slot=section]+[data-slot=section]]:mt-2.5" data-tauri-drag-region>
                <SidebarButtons action={()=>{}} icon={<RiAddLargeLine />} title="Create" />
                <SidebarButtons action={()=>{}} icon={<RiCommandLine />} title="Search" />
                <div className="flex items-center justify-center rounded-full mt-4 mb-4">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="dark:bg-orange-300">A</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    </div>
)

export default Sidebar