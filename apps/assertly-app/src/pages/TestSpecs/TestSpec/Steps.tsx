import { RiAddLargeLine } from "react-icons/ri";
import { Button } from "src/components/ui/button";
import Step from "./Step";
import {
    testSpecCurrentlyOpenStepIndexAtom,
    testSpecLastExecutedStepIndexAtom,
    testSpecStepsAtom,
    TestStep,
} from "src/store/test-specs/testSpecs";
import { useAtom } from "jotai";

interface StepsProps {
    runStep: (index: number) => void;
}

const Steps: React.FC<StepsProps> = ({ runStep }) => {
    const [steps, setSteps] = useAtom(testSpecStepsAtom);
    const [openStepIndex, setOpenStepIndex] = useAtom(
        testSpecCurrentlyOpenStepIndexAtom,
    );
    const [currentStepIndex] = useAtom(testSpecLastExecutedStepIndexAtom);
    const addStep = () => {
        const newStep = {
            id: steps.length.toString(),
            index: steps.length,
            type: "",
            props: {},
        };
        setSteps([...steps, newStep]);
        setOpenStepIndex(steps.length);
    };

    const updateStep = (id: string, updatedStep: Partial<TestStep>) => {
        setSteps(
            steps.map((step) =>
                step.id === id ? { ...step, ...updatedStep } : step,
            ),
        );
    };

    const deleteStep = (id: string) => {
        setSteps(steps.filter((step) => step.id !== id));
    };

    return (
        <div className="py-4 pb-0 flex flex-col gap-4 w-full">
            {steps.map((step, index) => (
                <Step
                    key={step.id}
                    step={step}
                    updateStep={(updatedStep) =>
                        updateStep(step.id, updatedStep)
                    }
                    deleteStep={() => deleteStep(step.id)}
                    runStep={() => runStep(index)}
                    currentStepIndex={currentStepIndex}
                    index={index}
                    isOpen={index === openStepIndex}
                    setIsOpen={(o) =>
                        o ? setOpenStepIndex(index) : setOpenStepIndex(-1)
                    }
                />
            ))}
            <div className="w-full flex justify-center items-center mt-4">
                <div className="border-t dark:border-zinc-800 flex-1 mr-2"></div>
                <Button variant="outline" className="px-8" onClick={addStep}>
                    <RiAddLargeLine className="mr-2" /> Add New Step
                </Button>
                <div className="border-t dark:border-zinc-800 flex-1 ml-2"></div>
            </div>
        </div>
    );
};

export default Steps;
