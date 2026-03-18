import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Habilita validación automática de DTOs con class-validator
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,       // elimina propiedades no declaradas en el DTO
            forbidNonWhitelisted: true,  // lanza error si vienen propiedades extra
            transform: true,       // transforma payloads al tipo del DTO (ej: string → number)
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
