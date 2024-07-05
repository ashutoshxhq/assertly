import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class AgentSocketService {

    async orchestrate(client: Socket, message: string) { }
}
