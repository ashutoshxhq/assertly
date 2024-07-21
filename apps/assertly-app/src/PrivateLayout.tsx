import { Outlet } from "react-router-dom";
import { cn } from "./lib/utils";
import { useAtom } from "jotai";
import { isDarkMode } from "./store/app/app";
import { useEffect } from "react";

function PrivateLayout() {
    const [darkMode] = useAtom(isDarkMode);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className={cn(darkMode && "dark")}>
            <div className="flex flex-col h-[100vh] bg-zinc-200 dark:bg-zinc-900">
                <Outlet />
            </div>
        </div>
    );
}

export default PrivateLayout;
