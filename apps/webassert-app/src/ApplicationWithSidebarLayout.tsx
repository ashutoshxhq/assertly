import { Outlet } from "react-router-dom";
import Sidebar from "./components/molecules/Sidebar/Sidebar";

function ApplicationWithSidebarLayout() {
  return (
    <div className="dark flex flex-col h-[100vh] bg-zinc-900">
      <div className="flex flex-1 w-full bg-zinc-900">
        <div className="relative isolate flex w-full bg-white lg:bg-zinc-100 dark:bg-zinc-900 ">
          <Sidebar/>
          <main className="flex flex-1 flex-col pb-3 min-w-0 pl-[70px] pr-3 pt-3" data-tauri-drag-region>
            <div className="grow rounded-lg shadow-sm ring-1 ring-zinc-950/4 dark:bg-zinc-950 dark:ring-white/5 text-zinc-300 h-[calc(100vh-24px)] overflow-y-scroll">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ApplicationWithSidebarLayout;
