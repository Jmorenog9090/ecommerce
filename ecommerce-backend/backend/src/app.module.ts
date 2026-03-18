import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    PrismaModule, // @Global() — PrismaService disponible en toda la app
    RolesModule,
    UsersModule,
  ],
})
export class AppModule { }
