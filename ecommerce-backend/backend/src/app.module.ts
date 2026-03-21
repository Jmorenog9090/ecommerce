import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
    imports: [
        PrismaModule, // @Global() — PrismaService disponible en toda la app
        RolesModule,
        UsersModule,
        AuthModule,
    ],
    providers: [
        // Guard global JWT: protege todas las rutas excepto las marcadas con @Public()
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        // Guard global de roles: se ejecuta después del JWT guard
        { provide: APP_GUARD, useClass: RolesGuard },
    ],
})
export class AppModule { }
