import { columns } from "./TestSpecsTable/columns";
import { DataTable } from "src/components/molecules/Datatable/Datatable";
import { testSpecsAtom } from "src/store/test-specs/testSpecs";
import { useAtom } from "jotai";

export type TestSpec = {
    id: string;
    name: string;
    pipeline: object[];
    status: "idle" | "running" | "success" | "failed";
    createdAt: string;
    lastRanAt: string;
    updatedAt: string;
};

const TestSpecs = () => {
    const [{ data }] = useAtom(testSpecsAtom);
    return (
        <div className="py-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 shadow border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
                <DataTable columns={columns} data={(data || []) as any} />
            </div>
        </div>
    );
};

export default TestSpecs;
