import { columns } from "./ApplicationTestRunsTable/columns";
import { testRuns } from "./ApplicationTestRunsTable/data";
import { DataTable } from "src/components/molecules/Datatable/Datatable";

const ApplicationTestRuns = () => {
    return (
        <div className="py-4">
            <div className="bg-white dark:bg-zinc-800/50 shadow border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
                <DataTable columns={columns} data={testRuns} />
            </div>
        </div>
    );
};

export default ApplicationTestRuns;
