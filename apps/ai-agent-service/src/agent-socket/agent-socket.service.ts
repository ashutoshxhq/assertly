import { Injectable } from '@nestjs/common';
import type { Socket } from 'socket.io';

@Injectable()
export class AgentSocketService {
    async orchestrate(client: Socket, message: string) {
        console.log('message', message);
    }
}
