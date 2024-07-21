import { useAtom } from "jotai";
import { useRef, useState, useCallback } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { Avatar, AvatarFallback } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { Textarea } from "src/components/ui/textarea";
import {
    testSpecPlannerConversationAtom,
    TestSpecPlannerMessage,
    testSpecStepsAtom,
} from "src/store/test-specs/testSpecs";
import axios from "axios";
import { AI_AGENT_SERVICE_URL } from "src/config/constants";

const PlannerAI = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [steps, setSteps] = useAtom(testSpecStepsAtom);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useAtom(testSpecPlannerConversationAtom);

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setMessage(e.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const sendMessage = useCallback(async () => {
        if (!message.trim()) return;

        const newUserMessage: TestSpecPlannerMessage = {
            id: messages.length,
            role: "user",
            content: message,
        };
        setMessages((prev) => [...prev, newUserMessage]);
        setMessage(""); // Clear the input after sending
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
        }

        try {
            const response = await axios.post(
                AI_AGENT_SERVICE_URL + "/v1/agents/test-planner",
                { message, existingSteps: steps },
            );

            const data = response.data;
            setSteps(
                data.data.steps.map((step: any, index: number) => ({
                    ...step,
                    id: index,
                })),
            );

            const newAiMessage: TestSpecPlannerMessage = {
                id: messages.length,
                role: "ai",
                steps: data.data.steps.join("\n"),
                content: data.data.message,
            };
            setMessages((prev) => [...prev, newAiMessage]);
        } catch (error) {
            console.error("Error fetching steps:", error);
        }
    }, [message, messages, steps, setMessages, setSteps]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col w-full h-full flex-1 overflow-hidden">
            <div className="flex-1 overflow-scroll text-sm flex flex-col gap-6 py-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
                    >
                        {msg.role === "ai" && (
                            <Avatar className="w-8 h-8 border dark:border-zinc-600">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={`px-3 rounded-lg max-w-[90%] ${
                                msg.role === "user"
                                    ? "bg-zinc-200 dark:bg-zinc-800 py-2 px-4"
                                    : "bg-card"
                            }`}
                        >
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-card bottom-0 flex items-center gap-2 bg-zinc-200 dark:bg-zinc-900 rounded-[30px] min-h-14 mt-2"
            >
                <Textarea
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 resize-none border-none rounded-none px-8 py-4"
                    ref={textAreaRef}
                    value={message}
                    onChange={handleTextAreaChange}
                    onKeyDown={handleKeyDown}
                />
                <div className="flex items-end justify-center h-full p-3">
                    <Button
                        variant="default"
                        size="icon"
                        className="rounded-[30px]"
                        type="submit"
                    >
                        <RiSendPlane2Line className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PlannerAI;
