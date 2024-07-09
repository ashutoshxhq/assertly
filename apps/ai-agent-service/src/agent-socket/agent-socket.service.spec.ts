import { Test, TestingModule } from '@nestjs/testing';
import { AgentSocketService } from './agent-socket.service';

describe('AgentSocketService', () => {
    let service: AgentSocketService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AgentSocketService],
        }).compile();

        service = module.get<AgentSocketService>(AgentSocketService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
