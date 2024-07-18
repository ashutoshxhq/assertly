import { Outlet } from "react-router-dom";
import { cn } from "./lib/utils";
import { useAtom } from "jotai";
import { isDarkMode } from "./store/app/app";

function PrivateLayout() {
    const [darkMode] = useAtom(isDarkMode);

    return (
        <div className={cn(darkMode && "dark")}>
            <div className="flex flex-col h-[100vh] bg-zinc-200 dark:bg-zinc-900">
                <Outlet />
            </div>
        </div>
    );
}

export default PrivateLayout;
