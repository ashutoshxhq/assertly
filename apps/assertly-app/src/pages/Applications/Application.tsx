import {
    RiFlaskLine,
    RiHashtag,
    RiListCheck3,
    RiSettings3Line,
} from "react-icons/ri";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";
import TestSpecs from "./TestSpecs/TestSpecs";
import Modules from "./Modules/Modules";
import TestRuns from "./ApplicationTestRuns/ApplicationTestRuns";
import ApplicationSettings from "./ApplicationSettings/ApplicationSettings";
import { CreateTestSpec } from "./TestSpecs/TestSpec/CreateTestSpec";
import { Link } from "react-router-dom";

const Application = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col py-12 px-12 gap-8">
                <div className="flex items-center justify-between px-1">
                    <div className="flex flex-col items-start justify-center gap-2">
                        <div className="flex gap-1">
                            <Link
                                to="/applications"
                                className="text-2xl tracking-tight text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-300"
                            >
                                applications
                            </Link>
                            <h2 className="text-2xl font-bold tracking-tight ">
                                / assertly-webapp
                            </h2>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            Manage all your test specs, modules, test suits and
                            test runs here.
                        </p>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center justify-end gap-2">
                            <CreateTestSpec />
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="tests" className="w-full">
                    <TabsList className="bg-gray-200">
                        <TabsTrigger value="tests">
                            <RiFlaskLine className="mr-2" />
                            Test Specs
                        </TabsTrigger>
                        <TabsTrigger value="modules">
                            <RiHashtag className="mr-2" />
                            User Flows
                        </TabsTrigger>
                        <TabsTrigger value="test-runs">
                            <RiListCheck3 className="mr-2" />
                            Test Runs
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            <RiSettings3Line className="mr-2" />
                            Settings
                        </TabsTrigger>
                    </TabsList>
                    <div className="border-b dark:border-zinc-900 my-4"></div>
                    {/* <div className="border-b-2 dark:border-zinc-900 my-4"></div> */}
                    <TabsContent value="tests">
                        <TestSpecs />
                    </TabsContent>
                    <TabsContent value="modules">
                        <Modules />
                    </TabsContent>
                    <TabsContent value="test-runs">
                        <TestRuns />
                    </TabsContent>
                    <TabsContent value="settings">
                        <ApplicationSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Application;
