import {
    RiArrowDownSLine,
    RiArrowRightSLine,
    RiDeleteBin6Line,
    RiPlayLargeFill,
} from "react-icons/ri";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "src/components/ui/collapsible";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import StepTypeSelect from "./StepTypeSelect";
import { cn } from "src/lib/utils";
import { useAtom } from "jotai";
import {
    Step as TestStep,
    testSpecExecutedStepIdsAtom,
    testSpecStepsAtom,
} from "src/store/test-specs/steps";
import { useEffect, useState } from "react";

interface StepProps {
    step: TestStep;
    updateStep: (updatedStep: Partial<TestStep>) => void;
    deleteStep: () => void;
    runStep: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Step = ({
    step,
    updateStep,
    deleteStep,
    runStep,
    isOpen,
    setIsOpen,
}: StepProps) => {
    const updateProperty = (key: string, value: any) => {
        updateStep({ props: { ...step.props, [key]: value } });
    };

    return (
        <div className="flex w-full border border-zinc-300/50 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 rounded-md">
            <Collapsible
                className="w-full"
                open={isOpen}
                onOpenChange={(open) => setIsOpen(open)}
            >
                <CollapsibleTrigger asChild className="w-full">
                    <StepTitle
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        stepId={step.id}
                        stepType={step.type}
                        stepProperties={step.props}
                        runStep={runStep}
                        updateStep={updateStep}
                        deleteStep={deleteStep}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                    <div className="w-full flex flex-col border-t dark:border-zinc-700/40 p-4">
                        <StepProperties
                            stepType={step.type}
                            stepProperties={step.props}
                            updateProperty={updateProperty}
                        />
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

const getStepDescription = (
    stepType: string,
    stepProperties: Record<string, any>,
) => {
    switch (stepType) {
        case "javascript":
            return "Run custom JavaScript code";
        case "visual-assert":
            return "Perform a visual assertion";
        case "goto":
            return `Navigate to ${stepProperties.url || "a URL"}`;
        case "click":
            return `Click on ${stepProperties.selectorQuery || "an element"}`;
        case "hover":
            return `Hover over ${stepProperties.selectorQuery || "an element"}`;
        case "scroll":
            return `Scroll to ${stepProperties.selectorQuery || "an element"}`;
        case "type":
            return `Type "${stepProperties.text || "text"}" into ${stepProperties.selectorQuery || "an input field"}`;
        case "press":
            return `Press the ${stepProperties.key || "a key"} key on ${stepProperties.selectorQuery || "an element"}`;
        case "select":
            return `Select "${stepProperties.value || "a value"}" from ${stepProperties.selectorQuery || "a dropdown"}`;
        case "wait":
            return `Wait for ${stepProperties.selectorQuery || "an element"} (timeout: ${stepProperties.timeout || "default"} ms)`;
        case "localstorage":
            return `${stepProperties.operation === "set" ? "Set" : "Get"} localStorage key "${stepProperties.key || "a key"}"`;
        case "file-upload":
            return `Upload file(s) to ${stepProperties.selectorQuery || "an input"}`;
        default:
            return "Select a step type";
    }
};

const StepTitle = ({
    isOpen,
    setIsOpen,
    stepId,
    stepType,
    stepProperties,
    deleteStep,
    updateStep,
    runStep,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    stepId: string;
    stepType?: string;
    stepProperties: Record<string, any>;
    deleteStep: () => void;
    updateStep: any;
    runStep: () => void;
}) => {
    const [testSpecExecutedStepIds] = useAtom(testSpecExecutedStepIdsAtom);
    const [steps] = useAtom(testSpecStepsAtom);
    const [firstRemainingStepId, setFirstRemainingStepId] = useState<
        string | null
    >(steps[0]?.id || null);

    useEffect(() => {
        const remainingSteps = steps.filter(
            (step) => !testSpecExecutedStepIds.find((id) => id === step.id),
        );
        setFirstRemainingStepId(remainingSteps[0]?.id || null);
    }, [steps, testSpecExecutedStepIds]);

    return (
        <div className="flex justify-between items-center w-full ">
            <div className="flex flex-1 h-full px-2">
                {isOpen && (
                    <div className="py-2">
                        <StepTypeSelect
                            stepType={stepType}
                            setStepType={(type: string) => updateStep({ type })}
                        />
                    </div>
                )}
                <div
                    className="flex-1 cursor-pointer select-none py-3"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {!isOpen && (
                        <div className="px-2">
                            <span className="text-sm font-medium">
                                {" "}
                                {getStepDescription(
                                    stepType || "",
                                    stepProperties,
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center items-center px-2">
                <Button
                    variant="ghost"
                    size={"icon"}
                    onClick={runStep}
                    disabled={firstRemainingStepId !== stepId}
                    className={cn(
                        firstRemainingStepId === stepId &&
                            "text-green-500 dark:hover:text-green-400",
                    )}
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
                    className="text-xl"
                >
                    {isOpen ? <RiArrowRightSLine /> : <RiArrowDownSLine />}
                </Button>
            </div>
        </div>
    );
};

const StepProperties = ({
    stepType,
    stepProperties,
    updateProperty,
}: {
    stepType?: string;
    stepProperties: Record<string, any>;
    updateProperty: (key: string, value: any) => void;
}) => {
    const renderProperties = () => {
        switch (stepType) {
            case "javascript":
                return (
                    <>
                        <label
                            htmlFor="script"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            JavaScript Code
                        </label>
                        <textarea
                            id="script"
                            className="w-full p-2 dark:bg-zinc-700 dark:text-white text-zinc-700 rounded-md"
                            placeholder="Enter JavaScript code"
                            value={stepProperties.script || ""}
                            onChange={(e) =>
                                updateProperty("script", e.target.value)
                            }
                        />
                    </>
                );
            case "visual-assert":
                return <span>No additional properties for Visual Assert</span>;
            case "goto":
                return (
                    <>
                        <label
                            htmlFor="url"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            URL
                        </label>
                        <Input
                            id="url"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="URL (https://example.com)"
                            type="url"
                            value={stepProperties.url || ""}
                            onChange={(e) =>
                                updateProperty("url", e.target.value)
                            }
                        />
                    </>
                );
            case "click":
            case "hover":
            case "scroll":
                return (
                    <>
                        <label
                            htmlFor="selector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="selector"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                    </>
                );
            case "type":
                return (
                    <>
                        <label
                            htmlFor="typeSelector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="typeSelector"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 mb-2"
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                        <label
                            htmlFor="typeText"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Text to Type
                        </label>
                        <Input
                            id="typeText"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="Text to type"
                            value={stepProperties.text || ""}
                            onChange={(e) =>
                                updateProperty("text", e.target.value)
                            }
                        />
                    </>
                );
            case "press":
                return (
                    <>
                        <label
                            htmlFor="pressSelector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="pressSelector"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 mb-2"
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                        <label
                            htmlFor="pressKey"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Key to Press
                        </label>
                        <Input
                            id="pressKey"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="Key to press"
                            value={stepProperties.key || ""}
                            onChange={(e) =>
                                updateProperty("key", e.target.value)
                            }
                        />
                    </>
                );
            case "select":
                return (
                    <>
                        <label
                            htmlFor="selectSelector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="selectSelector"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 mb-2"
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                        <label
                            htmlFor="selectValue"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Value to Select
                        </label>
                        <Input
                            id="selectValue"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="Value to select"
                            value={stepProperties.value || ""}
                            onChange={(e) =>
                                updateProperty("value", e.target.value)
                            }
                        />
                    </>
                );
            case "wait":
                return (
                    <>
                        <label
                            htmlFor="waitSelector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="waitSelector"
                            className="dark:border-zinc-700 dark:focus-visible:ring-zinc-300 mb-2 "
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                        <label
                            htmlFor="waitTimeout"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Timeout (ms)
                        </label>
                        <Input
                            id="waitTimeout"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="Timeout (ms)"
                            type="number"
                            value={stepProperties.timeout || ""}
                            onChange={(e) =>
                                updateProperty(
                                    "timeout",
                                    parseInt(e.target.value),
                                )
                            }
                        />
                    </>
                );
            case "localstorage":
                return (
                    <>
                        <label
                            htmlFor="localStorageOperation"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Operation
                        </label>
                        <select
                            id="localStorageOperation"
                            className="w-full p-2 dark:bg-zinc-700 text-white rounded-md mb-2"
                            value={stepProperties.operation || ""}
                            onChange={(e) =>
                                updateProperty("operation", e.target.value)
                            }
                        >
                            <option value="">Select operation</option>
                            <option value="set">Set</option>
                            <option value="get">Get</option>
                        </select>
                        <label
                            htmlFor="localStorageKey"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Key
                        </label>
                        <Input
                            id="localStorageKey"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 mb-2"
                            placeholder="Key"
                            value={stepProperties.key || ""}
                            onChange={(e) =>
                                updateProperty("key", e.target.value)
                            }
                        />
                        {stepProperties.operation === "set" && (
                            <>
                                <label
                                    htmlFor="localStorageValue"
                                    className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                                >
                                    Value
                                </label>
                                <Input
                                    id="localStorageValue"
                                    className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                                    placeholder="Value"
                                    value={stepProperties.value || ""}
                                    onChange={(e) =>
                                        updateProperty("value", e.target.value)
                                    }
                                />
                            </>
                        )}
                    </>
                );
            case "file-upload":
                return (
                    <>
                        <label
                            htmlFor="fileUploadSelector"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            Element to Select
                        </label>
                        <Input
                            id="fileUploadSelector"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 mb-2"
                            placeholder="Selector"
                            value={stepProperties?.selectorQuery || ""}
                            onChange={(e) =>
                                updateProperty("selectorQuery", e.target.value)
                            }
                        />
                        <label
                            htmlFor="fileUploadPaths"
                            className="block mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                            File Path(s)
                        </label>
                        <Input
                            id="fileUploadPaths"
                            className="border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50"
                            placeholder="File path(s) (comma-separated for multiple)"
                            value={stepProperties.files || ""}
                            onChange={(e) =>
                                updateProperty(
                                    "files",
                                    e.target.value.split(","),
                                )
                            }
                        />
                    </>
                );
            default:
                return;
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-col gap-1">{renderProperties()}</div>
        </div>
    );
};

export default Step;
