import { Step } from './step.dto';

export class Message {
    text: string;
    from: string;
    to: string;
}
export class ConversationContext {
    messages: Message[];
    steps: Step[];
    conversationId: string;
    teamId: string;
    userId: string;
}
