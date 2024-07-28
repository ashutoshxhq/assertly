import { useAtom } from "jotai";
import ConsoleLogs from "src/components/molecules/Console/ConsoleLog";
import NetworkLogs from "src/components/molecules/Network/NetworkLogs";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";
import {
    currentTestSpecExecutionLogsAtom,
    currentTestSpecExecutionNetworkLogsAtom,
} from "src/store/test-specs/steps";

const PreviewContext = () => {
    const [currentTestSpecExecutionLogs] = useAtom(
        currentTestSpecExecutionLogsAtom,
    );

    const [currentTestSpecExecutionNetworkLogs] = useAtom(
        currentTestSpecExecutionNetworkLogsAtom,
    );
    return (
        <div className="flex flex-1 p-2 h-full w-full grow rounded-lg shadow ring-1 ring-zinc-200 dark:ring-zinc-950/4 bg-white dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300">
            <Tabs defaultValue="console" className="w-full">
                <TabsList>
                    <TabsTrigger value="console">Console</TabsTrigger>
                    <TabsTrigger value="network">Network</TabsTrigger>
                    <TabsTrigger value="context">Context</TabsTrigger>
                </TabsList>
                <TabsContent value="console" className="h-full">
                    <ConsoleLogs logs={currentTestSpecExecutionLogs} />
                </TabsContent>
                <TabsContent value="network" className="h-full">
                    <NetworkLogs logs={currentTestSpecExecutionNetworkLogs} />
                </TabsContent>
                <TabsContent value="context">
                    Your test context here
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PreviewContext;
