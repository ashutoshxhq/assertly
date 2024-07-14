import { Body, Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { PlannerAIDTO } from './dto/planner.dto';

@Controller('v1/agents')
export class AgentController {
    constructor(private readonly agentService: AgentService) {}

    @Post('test-planner')
    async plannerAgent(@Body() data: PlannerAIDTO) {
        try {
            return await this.agentService.planSteps(data);
        } catch (error) {
            throw error;
        }
    }
}
