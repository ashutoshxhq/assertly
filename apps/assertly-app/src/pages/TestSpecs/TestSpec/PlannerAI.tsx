import { useRef } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri'
import { Avatar, AvatarFallback } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Textarea } from 'src/components/ui/textarea'

const PlannerAI = () => {
    const textAreaRef = useRef<any>(null);

    const handleTextAreaChange = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };
    
    return (
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
    )
}

export default PlannerAI