import { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine, RiDeleteBin6Line, RiPlayLargeFill } from "react-icons/ri";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "src/components/ui/collapsible";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import StepTypeSelect from "./StepTypeSelect";
import { cn } from "src/lib/utils";

interface StepProps {
    step: {
        id: string;
        type: string;
        properties: Record<string, any>;
    };
    updateStep: (updatedStep: Partial<{ type: string; properties: Record<string, any> }>) => void;
    deleteStep: () => void;
    runStep: () => void;
    currentStepIndex: number;
    index: number;
}

const Step = ({ step, updateStep, deleteStep, runStep, currentStepIndex, index }: StepProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const updateProperty = (key: string, value: any) => {
        updateStep({ properties: { ...step.properties, [key]: value } });
    };

    return (
        <div className="flex w-full bg-zinc-800 rounded-md">
            <Collapsible
                className="w-full"
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <CollapsibleTrigger asChild className="w-full">
                    <StepTitle
                        isOpen={isOpen}
                        stepType={step.type}
                        deleteStep={deleteStep}
                        setIsOpen={setIsOpen}
                        updateStep={updateStep}
                        runStep={runStep}
                        currentStepIndex={currentStepIndex}
                        index={index}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                    <div className="w-full flex flex-col border-t border-zinc-700/40 p-4">
                        <StepProperties
                            stepType={step.type}
                            stepProperties={step.properties}
                            updateProperty={updateProperty}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

const StepTitle = ({ isOpen, setIsOpen, stepType, deleteStep, updateStep, runStep, currentStepIndex, index }: {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    stepType: string,
    deleteStep: () => void,
    updateStep: any,
    runStep: () => void,
    currentStepIndex: number;
    index: number;
}) => (
    <div className="flex justify-between items-center w-full ">
        <div className="flex flex-1 h-full px-2">
            <div className="py-2">
                <StepTypeSelect
                    stepType={stepType}
                    setStepType={(type: string) => updateStep({ type })}
                />
            </div>
            <div className="flex-1 cursor-pointer select-none py-3" onClick={() => setIsOpen(!isOpen)}>
            </div>
        </div>


        <div className="flex justify-center items-center px-2">
            <Button
                variant="ghost"
                size={"icon"}
                onClick={runStep}
                disabled={currentStepIndex === index || currentStepIndex > index || currentStepIndex + 1 < index}
                className={cn(!(currentStepIndex === index || currentStepIndex > index || currentStepIndex + 1 < index) && "text-green-500 dark:hover:text-green-400")}
            >
                <RiPlayLargeFill className="mr-1" />
            </Button>
            <Button
                variant="ghost"
                size={"icon"}
                onClick={deleteStep}
                className=""
            >
                <RiDeleteBin6Line />
            </Button>
            <Button
                variant="ghost"
                size={"icon"}
                onClick={() => setIsOpen(!isOpen)}
                className="text-xl">
                {isOpen ? <RiArrowRightSLine /> : <RiArrowDownSLine />}
            </Button>
        </div>

    </div>
);

const StepProperties = ({
    stepType,
    stepProperties,
    updateProperty,
}: {
    stepType: string;
    stepProperties: Record<string, any>;
    updateProperty: (key: string, value: any) => void;
}) => {
    const renderProperties = () => {
        switch (stepType) {
            case "javascript":
                return (
                    <textarea
                        className="w-full p-2 bg-zinc-700 text-white rounded-md"
                        placeholder="Enter JavaScript code"
                        value={stepProperties.script || ""}
                        onChange={(e) => updateProperty("script", e.target.value)}
                    />
                );
            case "visual-assert":
                return <span>No additional properties for Visual Assert</span>;
            case "goto":
                return (
                    <Input
                        className="dark:border-zinc-700"
                        placeholder="URL (https://example.com)"
                        type="url"
                        value={stepProperties.url || ""}
                        onChange={(e) => updateProperty("url", e.target.value)}
                    />
                );
            case "click":
            case "hover":
            case "scroll":
                return (
                    <Input
                        className="dark:border-zinc-700"
                        placeholder="Selector"
                        value={stepProperties.selector || ""}
                        onChange={(e) => updateProperty("selector", e.target.value)}
                    />
                );
            case "type":
                return (
                    <>
                        <Input
                            className="dark:border-zinc-700 mb-2"
                            placeholder="Selector"
                            value={stepProperties.selector || ""}
                            onChange={(e) => updateProperty("selector", e.target.value)}
                        />
                        <Input
                            className="dark:border-zinc-700"
                            placeholder="Text to type"
                            value={stepProperties.text || ""}
                            onChange={(e) => updateProperty("text", e.target.value)}
                        />
                    </>
                );
            case "press":
                return (
                    <>
                        <Input
                            className="dark:border-zinc-700 mb-2"
                            placeholder="Selector"
                            value={stepProperties.selector || ""}
                            onChange={(e) => updateProperty("selector", e.target.value)}
                        />
                        <Input
                            className="dark:border-zinc-700"
                            placeholder="Key to press"
                            value={stepProperties.key || ""}
                            onChange={(e) => updateProperty("key", e.target.value)}
                        />
                    </>
                );
            case "select":
                return (
                    <>
                        <Input
                            className="dark:border-zinc-700 mb-2"
                            placeholder="Selector"
                            value={stepProperties.selector || ""}
                            onChange={(e) => updateProperty("selector", e.target.value)}
                        />
                        <Input
                            className="dark:border-zinc-700"
                            placeholder="Value to select"
                            value={stepProperties.value || ""}
                            onChange={(e) => updateProperty("value", e.target.value)}
                        />
                    </>
                );
            case "wait":
                return (
                    <>
                        <Input
                            className="dark:border-zinc-700 dark:focus-visible:ring-zinc-300 mb-2 "
                            placeholder="Selector"
                            value={stepProperties.selector || ""}
                            onChange={(e) => updateProperty("selector", e.target.value)}
                        />
                        <Input
                            className="dark:border-zinc-700"
                            placeholder="Timeout (ms)"
                            type="number"
                            value={stepProperties.timeout || ""}
                            onChange={(e) => updateProperty("timeout", parseInt(e.target.value))}
                        />
                    </>
                );
            case "localstorage":
                return (
                    <>
                        <select
                            className="w-full p-2 bg-zinc-700 text-white rounded-md mb-2"
                            value={stepProperties.operation || ""}
                            onChange={(e) => updateProperty("operation", e.target.value)}
                        >
                            <option value="">Select operation</option>
                            <option value="set">Set</option>
                            <option value="get">Get</option>
                        </select>
                        <Input
                            className="dark:border-zinc-700 mb-2"
                            placeholder="Key"
                            value={stepProperties.key || ""}
                            onChange={(e) => updateProperty("key", e.target.value)}
                        />
                        {stepProperties.operation === "set" && (
                            <Input
                                className="dark:border-zinc-700"
                                placeholder="Value"
                                value={stepProperties.value || ""}
                                onChange={(e) => updateProperty("value", e.target.value)}
                            />
                        )}
                    </>
                );
            case "file-upload":
                return (
                    <>
                        <Input
                            className="dark:border-zinc-700 mb-2"
                            placeholder="Selector"
                            value={stepProperties.selector || ""}
                            onChange={(e) => updateProperty("selector", e.target.value)}
                        />
                        <Input
                            className="dark:border-zinc-700"
                            placeholder="File path(s) (comma-separated for multiple)"
                            value={stepProperties.files || ""}
                            onChange={(e) => updateProperty("files", e.target.value.split(","))}
                        />
                    </>
                );
            default:
                return;
        }
    };

    return (
        <div className="w-full flex flex-col">
            <span className="uppercase text-xs text-zinc-500 font-medium">Properties</span>
            <div className="flex flex-col gap-1 pt-4">
                {renderProperties()}
            </div>
        </div>
    );
};

export default Step;