import { Test, TestingModule } from '@nestjs/testing';
import { AgentSocketGateway } from './agent-socket.gateway';
import { AgentSocketService } from './agent-socket.service';

describe('AgentSocketGateway', () => {
    let gateway: AgentSocketGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AgentSocketGateway, AgentSocketService],
        }).compile();

        gateway = module.get<AgentSocketGateway>(AgentSocketGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
