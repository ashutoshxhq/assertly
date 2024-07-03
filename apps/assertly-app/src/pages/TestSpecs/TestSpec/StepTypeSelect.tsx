import React from "react"
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri"
import { Button } from "src/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "src/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "src/components/ui/popover"
import { cn } from "src/lib/utils"

const StepTypeSelect = () => {
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
                        ? actions.find((framework) => framework.value === value)?.label
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
                            {actions.map((framework) => (
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

export default StepTypeSelect


const actions = [
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
