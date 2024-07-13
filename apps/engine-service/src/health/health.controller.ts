import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get('v1/health')
    async health() {
        return {
            status: 'UP',
            version: '1.0.0',
        };
    }
}
