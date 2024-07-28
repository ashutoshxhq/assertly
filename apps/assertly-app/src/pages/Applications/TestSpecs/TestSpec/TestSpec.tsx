import {
    RiArrowLeftSLine,
    RiEqualizer2Line,
    RiSave2Line,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Button } from "src/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "src/components/ui/resizable";
import {
    selectedTestSpecAtom,
    selectedTestSpecIdAtom,
    updateTestSpecMutationAtom,
} from "src/store/test-specs/testSpecs";
import Loader from "src/components/molecules/Loader";
import { testSpecStepsAtom } from "src/store/test-specs/steps";
import StepBuilder from "./StepBuilder";
import PreviewWindow from "./PreviewWindow";
import PreviewContext from "./PreviewContext";
import { EditTestSpec } from "./EditTestSpec";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "src/components/ui/tabs";

const TestSpec = () => {
    const { specId } = useParams();
    const navigate = useNavigate();
    const [{ data, status }] = useAtom(selectedTestSpecAtom);
    const [, setsSelectedTestSpecId] = useAtom(selectedTestSpecIdAtom);
    const [steps] = useAtom(testSpecStepsAtom);
    const [{ mutate, status: updateStatus }] = useAtom(
        updateTestSpecMutationAtom,
    );

    useEffect(() => {
        if (specId) {
            setsSelectedTestSpecId(specId);
        }
    }, [specId, setsSelectedTestSpecId]);

    const saveTestSpec = () => {
        mutate({
            where: {
                id: specId,
            },
            data: {
                metadata: {
                    steps: steps,
                },
            },
        });
    };

    if (status === "pending") {
        return <Loader />;
    }

    return (
        <div className="flex flex-col py-2 gap-2">
            <Tabs defaultValue="step-builder" className="flex flex-col">
                <div className="flex justify-between items-center px-2">
                    <div className="flex w-[33.33%] gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            className="mx-0 px-0 pr-4 pl-2 text-sm"
                        >
                            {" "}
                            <RiArrowLeftSLine className="text-xl" />
                            <span className="text-sm">Back</span>
                        </Button>
                        <EditTestSpec>
                            <div className="px-4 py-2 bg-white rounded-md shadow dark:bg-zinc-800 text-sm dark:text-zinc-300">
                                <span className="font-semibold lowercase">
                                    assertly
                                </span>{" "}
                                / {data?.name}
                            </div>
                        </EditTestSpec>
                    </div>
                    <div className="flex w-[33.33%] justify-center">
                        <TabsList>
                            <TabsTrigger value="step-builder">
                                Step Builder
                            </TabsTrigger>
                            <TabsTrigger value="test-planner">
                                Test Plan
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="flex w-[33.33%] items-center justify-end gap-2">
                        <Button
                            variant="secondary"
                            size={"sm"}
                            className="text-sm"
                            disabled={updateStatus === "pending"}
                            onClick={saveTestSpec}
                        >
                            {updateStatus === "pending" ? (
                                "Saving..."
                            ) : (
                                <>
                                    <RiSave2Line className="text-md mr-2" />
                                    <span className="text-sm">Save</span>
                                </>
                            )}
                        </Button>
                        <Button variant="secondary" className="text-sm">
                            <RiEqualizer2Line className="text-md mr-2" />
                            <span className="text-sm">Options</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1 w-full">
                    <TabsContent value="step-builder" className="w-full">
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="flex px-2"
                        >
                            <ResizablePanel
                                className="p-[1px]"
                                minSize={30}
                                defaultSize={40}
                            >
                                <StepBuilder />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel
                                className="p-[1px] ml-2"
                                defaultSize={60}
                            >
                                <ResizablePanelGroup
                                    direction="vertical"
                                    className="flex flex-col"
                                >
                                    <ResizablePanel
                                        defaultSize={60}
                                        className="p-[1px]"
                                    >
                                        <PreviewWindow />
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel
                                        defaultSize={40}
                                        className="p-[1px] mt-2"
                                    >
                                        <PreviewContext />
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </TabsContent>
                    <TabsContent value="test-planner">
                        Plan your test here
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default TestSpec;
