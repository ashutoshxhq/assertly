import { RiAddLargeLine } from "react-icons/ri";
import { Button } from "src/components/ui/button";
import Step from "./Step";
import { useAtom } from "jotai";
import {
    Step as TestSpecStep,
    testSpecOpenStepIdAtom,
    testSpecStepsAtom,
} from "src/store/test-specs/steps";
import { v4 } from "uuid";
import { selectedTestSpecAtom } from "src/store/test-specs/testSpecs";
import { useEffect } from "react";

interface StepsProps {
    runStepById: (stepId: string) => void;
}

const Steps: React.FC<StepsProps> = ({ runStepById }) => {
    const [{ data }] = useAtom(selectedTestSpecAtom);
    const [steps, setSteps] = useAtom(testSpecStepsAtom);
    console.log("Steps -> steps", steps);

    const [testSpecOpenStepId, setTestSpecOpenStepId] = useAtom(
        testSpecOpenStepIdAtom,
    );

    useEffect(() => {
        if (data?.metadata?.steps) {
            console.log("setting steps", data.metadata.steps);
            setSteps(data.metadata.steps);
        }
    }, [data.metadata?.steps, setSteps]);

    const createStep = () => {
        const id = v4().toString();
        setSteps((prev) => [
            ...prev,
            {
                id,
                title: "",
                stepType: "",
                props: {},
                status: "pending",
            },
        ]);
        setTestSpecOpenStepId(id);
    };

    const updateStep = (id: string, updatedStep: TestSpecStep) => {
        setSteps((prev) =>
            prev.map((step) => (step.id === id ? updatedStep : step)),
        );
    };

    const deleteStep = (id: string) => {
        setSteps((prev) => prev.filter((step) => step.id !== id));
    };

    return (
        <div className="py-4 pb-0 flex flex-col gap-4 w-full">
            {steps.map((step: TestSpecStep) => (
                <Step
                    key={step.id}
                    step={step}
                    updateStep={(updatedStep) =>
                        updateStep(step.id, { ...step, ...updatedStep })
                    }
                    deleteStep={() => deleteStep(step.id)}
                    runStep={() => runStepById(step.id)}
                    isOpen={testSpecOpenStepId === step.id}
                    setIsOpen={(open) =>
                        open
                            ? setTestSpecOpenStepId(step.id)
                            : setTestSpecOpenStepId("")
                    }
                />
            ))}
            <div className="w-full flex justify-center items-center mt-4">
                <div className="border-t dark:border-zinc-800 flex-1 mr-2"></div>
                <Button variant="outline" className="px-8" onClick={createStep}>
                    <RiAddLargeLine className="mr-2" /> Add New Step
                </Button>
                <div className="border-t dark:border-zinc-800 flex-1 ml-2"></div>
            </div>
        </div>
    );
};

export default Steps;
