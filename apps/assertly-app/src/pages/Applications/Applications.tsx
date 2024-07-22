import { RiAppsLine } from "react-icons/ri";
import { DataTable } from "src/components/molecules/Datatable/Datatable";
import { columns } from "./columns";
import { applicationsAtom } from "src/store/applications/applications";
import { useAtom } from "jotai";
import { CreateApplication } from "./CreateNewApplication";

const Applications = () => {
    const [{ data }] = useAtom(applicationsAtom);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-4xl">
                        <RiAppsLine />
                    </span>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Applications
                        </h2>
                        <p className="dark:text-zinc-500 text-sm">
                            Manage your applications here.
                        </p>
                    </div>
                </div>

                <div className="flex items-center mt-0">
                    <CreateApplication />
                </div>
            </div>
            <div className="border-b dark:border-zinc-900 my-8 mx-2"></div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 shadow border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Applications;
