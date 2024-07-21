import { columns } from "./TestSpecsTable/columns";
import { RiFlaskLine } from "react-icons/ri";
import { DataTable } from "src/components/molecules/Datatable/Datatable";
import { testSpecsAtom } from "src/store/test-specs/testSpecs";
import { useAtom } from "jotai";
import { CreateTestSpec } from "./TestSpec/CreateTestSpec";

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
    const [{ data, isPending, isError }] = useAtom(testSpecsAtom);
    console.log({ data, isPending, isError });
    return (
        <div className="p-8">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-4xl">
                        <RiFlaskLine />
                    </span>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Test Specs
                        </h2>
                        <p className="dark:text-zinc-500 text-sm">
                            Manage your test specs here
                        </p>
                    </div>
                </div>
                <div className="flex items-center mt-0">
                    <CreateTestSpec />
                </div>
            </div>
            <div className="border-b dark:border-zinc-900 my-8 mx-2"></div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
                <DataTable columns={columns} data={(data || []) as any} />
            </div>
        </div>
    );
};

export default TestSpecs;
