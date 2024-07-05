import { Controller } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('teams/:teamId/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
}
