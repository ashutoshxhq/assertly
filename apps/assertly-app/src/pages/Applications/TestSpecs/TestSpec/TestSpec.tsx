import {
    RiArrowLeftSLine,
    RiCloseLargeFill,
    RiEqualizer2Line,
    RiListIndefinite,
    RiPlayLargeFill,
    RiQuestionLine,
    RiRefreshLine,
    RiRobot2Line,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import useWebSocket from "react-use-websocket";
import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "src/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "src/components/ui/resizable";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";
import Steps from "./Steps";
import PlannerAI from "./PlannerAI";
import { Switch } from "src/components/ui/switch";
import { WEBDRIVER_SERVICE_URL } from "src/config/constants";
import {
    selectedTestSpecAtom,
    selectedTestSpecIdAtom,
    testSpecLastExecutedStepIndexAtom,
    testSpecStepsAtom,
} from "src/store/test-specs/testSpecs";
import Loader from "src/components/molecules/Loader";

const TestSpec = () => {
    const { specId } = useParams();
    const navigate = useNavigate();
    const [, setSelectedTestSpecId] = useAtom(selectedTestSpecIdAtom);
    const [{ data, status }] = useAtom(selectedTestSpecAtom);
    const [, setMessageHistory] = useState<MessageEvent<any>[]>([]);

    const [steps, setSteps] = useAtom(testSpecStepsAtom);
    const [lastPageContent, setLastPageContent] = useState("");
    const [lastPageScreenshot, setLastPageScreenshot] = useState("");
    const [, setCurrentStepIndex] = useAtom(testSpecLastExecutedStepIndexAtom);
    const [livePreview, setLivePreview] = useState(false);

    const [lastPageURL, setLastPageURL] = useState("about:blank");
    const clientIdRef = useRef(v4());
    const websocketUrl = useMemo(
        () => WEBDRIVER_SERVICE_URL + "?clientId=" + clientIdRef.current,
        [clientIdRef],
    );
    const { sendMessage, lastMessage } = useWebSocket(websocketUrl);

    useEffect(() => {
        if (specId) {
            setSelectedTestSpecId(specId);
        }
    }, [specId]);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
            try {
                const parsedData = JSON.parse(lastMessage.data);
                if (
                    parsedData.event === "ACTION_RESULT" &&
                    parsedData.data.pageContent
                ) {
                    const contentWithBase = `
                        <base href="${parsedData.data.hostname}">
                        ${parsedData.data.pageContent}
                    `;
                    setLastPageURL(parsedData.data.url);
                    setLastPageContent(contentWithBase);
                    setLastPageScreenshot(parsedData.data.screenshot);
                } else if (parsedData.event === "SELECTOR_UPDATE") {
                    if (parsedData.data.props.selector) {
                        setSteps((prev) => [
                            ...prev.map((step) => {
                                if (step.id === parsedData.data.id) {
                                    step.props.selector =
                                        parsedData.data.props.selector;
                                }
                                return step;
                            }),
                        ]);
                    }
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        }
    }, [lastMessage, setSteps]);
    const runAllSteps = () => {
        const message = {
            event: "ACTIONS",
            data: {
                actions: steps.map((step) => ({
                    id: step.id,
                    type: step.type,
                    props: step.props,
                })),
            },
        };
        sendMessage(JSON.stringify(message));
    };

    const runStep = useCallback(
        (stepIndex: number) => {
            if (stepIndex >= steps.length) {
                setCurrentStepIndex(-1);
                return;
            }

            const step = steps[stepIndex];
            const message = {
                event: "ACTIONS",
                data: {
                    actions: [
                        {
                            id: step.id,
                            type: step.type,
                            props: step.props,
                        },
                    ],
                },
            };
            sendMessage(JSON.stringify(message));
            setCurrentStepIndex(stepIndex);
        },
        [steps, sendMessage],
    );

    if (status === "pending") {
        return <Loader />;
    }

    return (
        <div className="flex flex-col py-2 gap-2">
            <div className="flex justify-between items-center px-2">
                <div className="flex w-[33.33%]">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                        className="mx-0 px-0 pr-4 pl-2 text-sm"
                    >
                        {" "}
                        <RiArrowLeftSLine className="text-xl" />
                        <span className="text-sm">Back</span>
                    </Button>
                </div>
                <div className="flex w-[33.33%] justify-center">
                    <div className="px-4 py-2 bg-zinc-100 rounded-md shadow dark:bg-zinc-800 text-sm dark:text-zinc-300">
                        <span className="font-semibold lowercase">
                            assertly
                        </span>{" "}
                        / {data?.name}
                    </div>
                </div>
                <div className="flex w-[33.33%] items-center justify-end gap-2">
                    <Button variant="secondary" className="text-sm">
                        <RiEqualizer2Line className="text-md mr-2" />
                        <span className="text-sm">Environment</span>
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        <RiEqualizer2Line className="text-md mr-2" />
                        <span className="text-sm">Schedule</span>
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        <RiEqualizer2Line className="text-md mr-2" />
                        <span className="text-sm">Options</span>
                    </Button>
                </div>
            </div>
            <ResizablePanelGroup direction="horizontal" className="flex px-2">
                <ResizablePanel
                    className="p-[1px]"
                    minSize={30}
                    defaultSize={40}
                >
                    <div className="flex rounded-lg shadow ring-1 ring-zinc-200  dark:ring-zinc-950/4 bg-zinc-50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 h-[calc(100vh-62px)] overflow-y-scroll">
                        <Tabs
                            defaultValue="steps"
                            className="flex flex-col items-center justify-start w-full p-4"
                        >
                            <div className="flex flex-wrap justify-between w-full gap-4">
                                <div className="flex">
                                    <TabsList>
                                        <TabsTrigger value="steps">
                                            {" "}
                                            <RiListIndefinite className="mr-2" />{" "}
                                            Steps
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
                                        onClick={runAllSteps}
                                    >
                                        <RiPlayLargeFill className="text-md mr-2 text-green-500" />
                                        <span className="text-sm">
                                            Run steps
                                        </span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size={"sm"}
                                        className="text-sm"
                                        onClick={() => setCurrentStepIndex(-1)}
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
                                <Steps runStep={runStep} />
                            </TabsContent>
                            <TabsContent
                                value="chat"
                                className="h-full w-full overflow-y-scroll"
                            >
                                <PlannerAI />
                            </TabsContent>
                        </Tabs>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="p-[1px] ml-2" defaultSize={60}>
                    <ResizablePanelGroup
                        direction="vertical"
                        className="flex flex-col"
                    >
                        <ResizablePanel defaultSize={65} className="p-[1px]">
                            <div className="flex flex-1 flex-col h-full grow rounded-lg shadow ring-1 dark:ring-zinc-950/4 ring-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 overflow-y-scroll">
                                <div className="flex items-center p-2 border-b ">
                                    <div className="flex-1">
                                        <div className="flex gap-2 px-2">
                                            <span className="bg-red-500 h-3 w-3 rounded-md"></span>
                                            <span className="bg-yellow-500 h-3 w-3 rounded-md"></span>
                                            <span className="bg-green-500 h-3 w-3 rounded-md"></span>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 gap-1 items-center justify-center">
                                        <div className="rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 px-8 py-1.5 w-80">
                                            <span className="text-xs dark:text-zinc-300 truncate">
                                                {lastPageURL}
                                            </span>
                                        </div>
                                        <div>
                                            <Button
                                                size={"icon"}
                                                variant={"ghost"}
                                                className="rounded-full w-6 h-6"
                                            >
                                                <RiRefreshLine />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 px-2 gap-4 items-center justify-end">
                                        <span className="dark:text-zinc-300 font-medium text-xs">
                                            Live Preview ?
                                        </span>
                                        <Switch
                                            checked={livePreview}
                                            onCheckedChange={setLivePreview}
                                        />

                                        <RiQuestionLine />
                                    </div>
                                </div>
                                <div className="lex flex-1 bg-zinc-100 dark:bg-zinc-300 w-full h-full bg-cover overflow-y-scroll">
                                    {!livePreview && lastPageScreenshot && (
                                        <img
                                            src={
                                                "data:image/jpeg;base64," +
                                                lastPageScreenshot
                                            }
                                        />
                                    )}
                                    {livePreview && (
                                        <iframe
                                            srcDoc={lastPageContent}
                                            title="Test Preview"
                                            className="w-full h-full border-none"
                                            sandbox="allow-same-origin allow-scripts"
                                        />
                                    )}
                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel
                            defaultSize={35}
                            className="p-[1px] mt-2"
                        >
                            <div className="flex flex-1 p-2 h-full grow rounded-lg shadow ring-1 ring-zinc-200 dark:ring-zinc-950/4 bg-zinc-50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 overflow-y-scroll">
                                <Tabs
                                    defaultValue="console"
                                    className="w-[400px]"
                                >
                                    <TabsList>
                                        <TabsTrigger value="console">
                                            Console
                                        </TabsTrigger>
                                        <TabsTrigger value="network">
                                            Network
                                        </TabsTrigger>
                                        <TabsTrigger value="context">
                                            Context
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="console">
                                        Your console logs here
                                    </TabsContent>
                                    <TabsContent value="network">
                                        Your network calls here
                                    </TabsContent>
                                    <TabsContent value="context">
                                        Your test context here
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default TestSpec;
