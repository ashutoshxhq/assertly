import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "src/components/ui/tooltip";
import { cn } from "src/lib/utils";

export interface SidebarNavItemProps {
    icon: ReactNode;
    title: string;
    to: string;
}

const SidebarNavItem = ({ icon, title, to }: SidebarNavItemProps) => {
    return (
        <NavLink to={to} end>
            {({ isActive }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="relative">
                                {/* {isActive && <span className="absolute inset-y-2 -left-4 w-1 rounded-full bg-zinc-950 dark:bg-white"></span>} */}
                                <div className={cn("flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5  dark:text-white dark:hover:bg-white/5", isActive && "bg-white/10")}>
                                    <span className={cn("text-xl text-[22px]", !isActive && "text-zinc-400")}>{icon}</span>
                                    <span className={cn("truncate hidden", !isActive && "text-zinc-200")}>{title}</span>
                                </div>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent align="end" side="right" className="">
                            <span className="text-zinc-800 font-medium text-md">{title}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            )}
        </NavLink>
    )
}

export default SidebarNavItem