import React from 'react'
import { RiArrowDownSLine, RiCheckLine } from 'react-icons/ri'
import { Button } from '@renderer/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@renderer/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { cn } from '@renderer/lib/utils'

const StepTypeSelect = ({ stepType, setStepType }: any) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          {stepType ? steps.find((framework) => framework.value === stepType)?.label : 'Select Step'}
          <RiArrowDownSLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search step..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {steps.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setStepType(currentValue === stepType ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <RiCheckLine
                    className={cn('ml-auto h-4 w-4', stepType === framework.value ? 'opacity-100' : 'opacity-0')}
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

const steps = [
  {
    value: 'goto',
    label: 'Goto URL'
  },
  {
    value: 'click',
    label: 'Click Element'
  },
  {
    value: 'type',
    label: 'Type Text'
  },
  {
    value: 'press',
    label: 'Press Keys'
  },
  {
    value: 'hover',
    label: 'Hover Element'
  },
  {
    value: 'scroll',
    label: 'Scroll'
  },
  {
    value: 'select',
    label: 'Select'
  },
  {
    value: 'wait',
    label: 'Wait For'
  },
  {
    value: 'ai-assert',
    label: 'AI Assert'
  },
  {
    value: 'ai-extract',
    label: 'AI Extract'
  },
  {
    value: 'localstorage',
    label: 'Local Storage'
  },
  {
    value: 'file-upload',
    label: 'File Upload'
  },
  {
    value: 'user-flow',
    label: 'Execute User Flow'
  },
  {
    value: 'javascript',
    label: 'Execute Javascript'
  },
  {
    value: 'visual-assert',
    label: 'Visual Assert'
  }
]
