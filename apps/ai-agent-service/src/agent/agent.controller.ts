import { Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { PlannerAIDTO } from './dto/planner.dto';

@Controller('agents')
export class AgentController {
    constructor(private readonly agentService: AgentService) {}

    @Post('planner-agent')
    async plannerAgent(data: PlannerAIDTO): Promise<void> {
        try {
            await this.agentService.planSteps(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
