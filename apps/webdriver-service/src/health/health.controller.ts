import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthController {
    @Get('v1/health')
    async health() {
        return {
            status: 'UP',
            version: '1.0.0',
        };
    }
}
