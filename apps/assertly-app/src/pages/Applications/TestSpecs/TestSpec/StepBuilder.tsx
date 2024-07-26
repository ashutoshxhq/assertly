import {
    RiCloseLargeFill,
    RiListIndefinite,
    RiPlayLargeFill,
    RiRobot2Line,
} from "react-icons/ri";
import { Button } from "src/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";
import Steps from "./Steps";
import PlannerAI from "./PlannerAI";
import {
    currentTestSpecExecutionPageURLAtom,
    currentTestSpecExecutionScreenshotAtom,
    isTestSpecRunningAtom,
    testSpecExecutedStepIdsAtom,
    testSpecStepsAtom,
} from "src/store/test-specs/steps";
import { useAtom } from "jotai";
import { useWebdriver } from "src/hooks/webdriver";

const StepBuilder = () => {
    const { runAllSteps, runStepById } = useWebdriver();
    const [, setTestSpecExecutedStepIds] = useAtom(testSpecExecutedStepIdsAtom);
    const [isStepsRunning] = useAtom(isTestSpecRunningAtom);
    const [, setSteps] = useAtom(testSpecStepsAtom);
    const [, setLastPageScreenshot] = useAtom(
        currentTestSpecExecutionScreenshotAtom,
    );
    const [, setLastPageURL] = useAtom(currentTestSpecExecutionPageURLAtom);

    const resetHandler = () => {
        setTestSpecExecutedStepIds([]);
        setSteps((prev) =>
            prev.map((step) => ({
                ...step,
                status: undefined,
            })),
        );
        setLastPageScreenshot("");
        setLastPageURL("");
    };

    return (
        <div className="flex rounded-lg shadow ring-1 ring-zinc-200  dark:ring-zinc-950/4 bg-zinc-50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 h-[calc(100vh-62px)] overflow-y-scroll">
            <Tabs
                defaultValue="steps"
                className="flex flex-col items-center justify-start w-full p-4"
            >
                <div className="flex flex-wrap justify-between w-full gap-4">
                    <div className="flex">
                        <TabsList className="w-full">
                            <TabsTrigger value="steps">
                                {" "}
                                <RiListIndefinite className="mr-2" /> Steps
                            </TabsTrigger>
                            <TabsTrigger value="chat">
                                <RiRobot2Line className="mr-2" />
                                Planner AI
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                        <Button
                            variant="default"
                            size={"sm"}
                            className="text-sm"
                            disabled={isStepsRunning}
                            onClick={runAllSteps}
                        >
                            {isStepsRunning ? (
                                "Running..."
                            ) : (
                                <>
                                    <RiPlayLargeFill className="text-md mr-2 text-green-500" />
                                    <span className="text-sm">Run steps</span>
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size={"sm"}
                            className="text-sm"
                            onClick={resetHandler}
                        >
                            <RiCloseLargeFill className="text-md mr-2 text-red-500" />
                            <span className="text-sm">Reset</span>
                        </Button>
                    </div>
                </div>

                <TabsContent
                    value="steps"
                    className="h-full w-full overflow-y-scroll"
                >
                    <Steps runStepById={runStepById} />
                </TabsContent>
                <TabsContent
                    value="chat"
                    className="h-full w-full overflow-y-scroll"
                >
                    <PlannerAI />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default StepBuilder;
