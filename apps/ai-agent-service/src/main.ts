import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(json({ limit: '500mb' }));
    await app.listen(process.env.PORT || 8000);
}
bootstrap();
