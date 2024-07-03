import { useState } from 'react'
import StepTypeSelect from './StepTypeSelect'
import { RiAddLargeLine, RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Button } from 'src/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'src/components/ui/collapsible'

const Steps = () => {
    const [stepCollapsible, setStepCollapsible] = useState<boolean[]>([true])

    return (
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
                            <StepTypeSelect />
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
                            <StepTypeSelect />
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
    )
}

export default Steps