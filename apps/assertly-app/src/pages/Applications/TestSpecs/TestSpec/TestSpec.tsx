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
import { useWebdriver } from "src/hooks/webdriver";
import StepBuilder from "./StepBuilder";
import PreviewWindow from "./PreviewWindow";
import PreviewContext from "./PreviewContext";

const TestSpec = () => {
    const { specId } = useParams();
    const navigate = useNavigate();
    const [{ data, status }] = useAtom(selectedTestSpecAtom);
    const [, setsSelectedTestSpecId] = useAtom(selectedTestSpecIdAtom);
    const [steps, setSteps] = useAtom(testSpecStepsAtom);
    const [{ mutate, status: updateStatus }] = useAtom(
        updateTestSpecMutationAtom,
    );
    const { runAllSteps, runStepById } = useWebdriver();

    useEffect(() => {
        if (data?.metadata?.steps) {
            setSteps(data.metadata.steps);
        }
    }, [data, setSteps]);

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
            <ResizablePanelGroup direction="horizontal" className="flex px-2">
                <ResizablePanel
                    className="p-[1px]"
                    minSize={30}
                    defaultSize={40}
                >
                    <StepBuilder
                        runAllSteps={runAllSteps}
                        runStepById={runStepById}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="p-[1px] ml-2" defaultSize={60}>
                    <ResizablePanelGroup
                        direction="vertical"
                        className="flex flex-col"
                    >
                        <ResizablePanel defaultSize={60} className="p-[1px]">
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
        </div>
    );
};

export default TestSpec;
