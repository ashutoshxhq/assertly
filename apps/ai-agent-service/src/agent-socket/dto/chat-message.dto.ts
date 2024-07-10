import { Step } from './step.dto';

export class ChatMessageDTO {
    message: string;
    existingSteps: Step[];
    conversationId: string;
    teamId: string;
    userId: string;
    testSpecId: string;
}
