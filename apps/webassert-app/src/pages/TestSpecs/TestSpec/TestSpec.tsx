import React, { useRef } from "react"
import { useState } from "react"
import { RiAddLargeLine, RiArrowDownSLine, RiArrowLeftSLine, RiArrowRightSLine, RiCheckLine, RiEqualizer2Line, RiListIndefinite, RiPlayLargeFill, RiQuestionLine, RiRefreshLine, RiRobot2Line, RiSendPlane2Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "src/components/ui/avatar"
import { Button } from "src/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "src/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "src/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs"
import { Textarea } from "src/components/ui/textarea"
import { cn } from "src/lib/utils"

const frameworks = [
    {
        value: "ai-action",
        label: "AI Action",
    },
    {
        value: "ai-assert",
        label: "AI Assert",
    },
    {
        value: "ai-extract",
        label: "AI Extract",
    },
    {
        value: "user-flow",
        label: "Execute User Flow",
    },
    {
        value: "captha",
        label: "Solve Captcha",
    },
    {
        value: "javascript",
        label: "Execute Javascript",
    },
    {
        value: "visual-assert",
        label: "Visual Diff",
    },
    {
        value: "click",
        label: "Click",
    },
    {
        value: "type",
        label: "Type",
    },
    {
        value: "press",
        label: "Press",
    },
    {
        value: "hover",
        label: "Hover",
    },
    {
        value: "scroll",
        label: "Scroll",
    },
    {
        value: "select",
        label: "Select",
    },
    {
        value: "wait",
        label: "Wait",
    },
    {
        value: "localstorage",
        label: "Local Storage",
    },
    {
        value: "file-upload",
        label: "File Upload",
    },
    {
        value: "captha",
        label: "Solve Captcha",
    },
]


const TestSpec = () => {
    const navigate = useNavigate()
    const [stepCollapsible, setStepCollapsible] = useState<boolean[]>([true])
    const textAreaRef = useRef<any>(null);

    const handleTextAreaChange = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="flex flex-col py-2 gap-2">
            <div className="flex justify-between items-center px-2">
                <div className="flex w-[33.33%]">
                    <Button variant="secondary" onClick={() => navigate(-1)} className="mx-0 px-0 pr-4 pl-2 text-sm"> <RiArrowLeftSLine className="text-xl" /><span className="text-sm">Back</span></Button>
                </div>
                <div className="flex  w-[33.33%] justify-center">
                    <div className="px-4 py-2 rounded-md bg-zinc-800 text-sm text-zinc-300"><span className="font-semibold lowercase">Webassert</span> / Untitled Test Spec</div>
                </div>
                <div className="flex w-[33.33%] items-center justify-end gap-2">
                    <Button variant="secondary" className="text-sm">
                        <RiPlayLargeFill className="text-md mr-2 text-green-500" />
                        <span className="text-sm">Run all steps</span>
                    </Button>
                    <Button variant="secondary" className="text-sm">
                        <RiEqualizer2Line className="text-md mr-2" />
                        <span className="text-sm">Options</span>
                    </Button>

                </div>
            </div>
            <ResizablePanelGroup direction="horizontal" className="flex px-2">
                <ResizablePanel className="p-[1px]" defaultSize={30}>
                    <div className="flex rounded-lg shadow-sm ring-1 ring-zinc-950/4 dark:bg-zinc-950 dark:ring-white/5 text-zinc-300 h-[calc(100vh-62px)] overflow-y-scroll">
                        <Tabs defaultValue="steps" className="flex flex-col items-center justify-start w-full p-4">
                            <TabsList >
                                <TabsTrigger value="steps"> <RiListIndefinite className="mr-2"/> Steps</TabsTrigger>
                                <TabsTrigger value="chat"><RiRobot2Line className="mr-2" />Planner AI</TabsTrigger>
                            </TabsList>
                            <TabsContent value="steps" className="w-full overflow-y-scroll">
                                <div className="py-4 flex flex-col gap-2 w-full">
                                    <div className="flex w-full bg-zinc-800 rounded-md">
                                        <Collapsible className="w-full" open={stepCollapsible[0]} onOpenChange={(open) => {
                                            let newStepCollapsible = [...stepCollapsible]
                                            newStepCollapsible[0] = open
                                            setStepCollapsible([...newStepCollapsible])
                                        }}>
                                            <CollapsibleTrigger className="w-full">
                                                <div className="flex justify-between items-center w-full py-3 px-4">
                                                    <span className="text-sm font-semibold">Goto https://google.com</span>
                                                    <span>{stepCollapsible[0] ? <RiArrowRightSLine /> : <RiArrowDownSLine />}</span>
                                                </div>

                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="w-full">
                                                <div className="w-full flex flex-col border-t border-zinc-700/40 p-4">
                                                    <TestTypeSelector />
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </div>
                                    <div className="flex w-full bg-zinc-800 rounded-md">
                                        <Collapsible className="w-full" open={stepCollapsible[1]} onOpenChange={(open) => {
                                            let newStepCollapsible = [...stepCollapsible]
                                            newStepCollapsible[1] = open
                                            setStepCollapsible([...newStepCollapsible])
                                        }}>
                                            <CollapsibleTrigger className="w-full">
                                                <div className="flex justify-between items-center w-full py-3 px-4">
                                                    <span className="text-sm font-semibold">Select Step Type</span>
                                                    <span>{stepCollapsible[1] ? <RiArrowRightSLine /> : <RiArrowDownSLine />}</span>
                                                </div>

                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="w-full">
                                                <div className="w-full flex flex-col border-t border-zinc-700/40 p-4">
                                                    <TestTypeSelector />
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </div>
                                    <div className="w-full flex justify-center items-center mt-4">
                                        <div className="border-t border-zinc-800 flex-1 mr-2"></div>
                                        <Button variant={"brand"} className="px-8"><RiAddLargeLine className="mr-2" /> Add New Step</Button>
                                        <div className="border-t border-zinc-800 flex-1 ml-2"></div>

                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="chat" className="h-full overflow-y-scroll">
                                <div className="flex flex-col w-full h-full flex-1 overflow-hidden">
                                    <div className="flex-1 overflow-scroll text-sm flex flex-col gap-6 py-4">

                                        <div className="flex items-start gap-4 justify-end">
                                            <div className="bg-primary p-3 rounded-lg max-w-[90%] bg-zinc-800">
                                                <p>I'm looking to create a new chat UI for my app. Can you help me with that?</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-1">
                                            <Avatar className="w-8 h-8 border border-zinc-600">
                                                <AvatarFallback>AI</AvatarFallback>
                                            </Avatar>
                                            <div className="bg-card px-2 py-0.5 rounded-lg max-w-[90%]">
                                                <p>Hey there! How can I help you today?</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="bg-card bottom-0 flex items-center gap-2 bg-zinc-900 rounded-[30px] min-h-14 mt-2">
                                        <Textarea
                                            placeholder="Type your message..."
                                            rows={1}
                                            className="flex-1 resize-none rounded-none px-8 py-4"
                                            ref={textAreaRef}
                                            onChange={handleTextAreaChange}
                                        />
                                        <div className="flex items-end justify-center h-full p-3">
                                            <Button variant="default" size="icon" className="rounded-[30px]">
                                                <RiSendPlane2Line className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="p-[1px] ml-2" defaultSize={70}>
                    <ResizablePanelGroup direction="vertical" className="flex flex-col">
                        <ResizablePanel defaultSize={70} className="p-[1px]">
                            <div className="flex flex-1 flex-col h-full grow rounded-lg shadow-sm ring-1 ring-zinc-950/4 dark:bg-zinc-950 dark:ring-white/5 text-zinc-300 overflow-y-scroll">
                                <div className="flex justify-between items-center p-2">
                                    <div className="flex gap-2 px-2">
                                        <span className="bg-red-500 h-2.5 w-2.5 rounded-md"></span>
                                        <span className="bg-yellow-500 h-2.5 w-2.5 rounded-md"></span>
                                        <span className="bg-green-500 h-2.5 w-2.5 rounded-md"></span>
                                    </div>
                                    <div className="flex gap-1 items-center justify-center">
                                        <div className="rounded-full flex items-center justify-center bg-zinc-800 px-8 py-1.5 w-80">
                                            <span className="text-xs text-zinc-300">https://google.com</span>
                                        </div>
                                        <div>
                                            <Button size={"icon"} variant={"ghost"} className="rounded-full w-6 h-6"><RiRefreshLine /></Button>
                                        </div>
                                    </div>
                                    <div className="flex px-2">
                                        <RiQuestionLine />
                                    </div>
                                </div>
                                <div className="lex flex-1 bg-zinc-300 w-full h-">

                                </div>
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={30} className="p-[1px] mt-2">
                            <div className="flex flex-1 p-2 h-full grow rounded-lg shadow-sm ring-1 ring-zinc-950/4 dark:bg-zinc-950 dark:ring-white/5 text-zinc-300 overflow-y-scroll">
                                <Tabs defaultValue="console" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger value="console">Console</TabsTrigger>
                                        <TabsTrigger value="network">Network</TabsTrigger>
                                        <TabsTrigger value="context">Context</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="console">Your console logs here</TabsContent>
                                    <TabsContent value="network">Your network calls here</TabsContent>
                                    <TabsContent value="context">Your test context here</TabsContent>
                                </Tabs>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>

                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default TestSpec



export function TestTypeSelector() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select"}
                    <RiArrowDownSLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Search action..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <RiCheckLine
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}