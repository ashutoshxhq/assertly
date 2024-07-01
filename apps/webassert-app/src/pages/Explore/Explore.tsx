import { Textarea } from "src/components/ui/textarea"
import { Button } from "../../../../../libs/web-components/dist/main"
import { useRef } from "react";
import { Avatar, AvatarFallback } from "src/components/ui/avatar";
import { RiSendPlane2Line } from "react-icons/ri";

const Explore = () => {
    const textAreaRef = useRef<any>(null);

    const handleTextAreaChange = () => {
        if(textAreaRef.current){
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };
    
    return (
        <div className="mx-auto max-w-6xl text-zinc-300 h-full text-sm overflow-y-scroll">
            <div className="flex flex-col w-full h-full">
                <div className="flex-1 overflow-auto p-10 space-y-4">
                    <div className="flex items-center gap-4 ">
                        <Avatar className="w-8 h-8 border border-zinc-600">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-card p-3 rounded-lg max-w-[70%]">
                            <p>Hey there! How can I help you today?</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                        <div className="bg-primary p-3 rounded-lg max-w-[70%] bg-zinc-800">
                            <p>I'm looking to create a new chat UI for my app. Can you help me with that?</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-8 h-8 border border-zinc-600">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-card p-3 rounded-lg max-w-[70%]">
                            <p>Yes, I'd be happy to help you with that. What kind of features are you looking for in the chat UI?</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                        <div className="bg-primary p-3 rounded-lg max-w-[70%] bg-zinc-800">
                            <p>
                                I'd like a clean and modern design, with the ability to send messages, view past conversations, and maybe
                                even some basic formatting options.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-card bottom-0 flex items-center gap-2 bg-zinc-900 rounded-[30px] min-h-14 mx-20 my-6">
                    <Textarea
                        ref={textAreaRef}
                        onChange={handleTextAreaChange}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 resize-none rounded-none px-8 py-4"
                    />
                    <div className="flex items-end justify-center h-full p-3">
                        <Button variant="default" size="icon" className="rounded-[30px]">
                            <RiSendPlane2Line className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore