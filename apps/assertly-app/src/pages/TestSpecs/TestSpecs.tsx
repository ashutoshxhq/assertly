import { Button } from "src/components/ui/button";
import { columns } from "./TestSpecsTable/columns";
import { specs } from "./TestSpecsTable/data";
import { RiAddLargeLine, RiFlaskLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DataTable } from "src/components/molecules/Datatable/Datatable";

const TestSpecs = () => {
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
                    <Button
                        asChild
                        variant={"brand"}
                        className="bg-orange-500 mt-0"
                    >
                        <Link to="/specs/newspec">
                            <RiAddLargeLine className="mx-2" /> New Test Spec
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="border-b dark:border-zinc-900 my-8 mx-2"></div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-md py-4">
                <DataTable columns={columns} data={specs} />
            </div>
        </div>
    );
};

export default TestSpecs;
