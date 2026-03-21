import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
/**
 * Capa de acceso a datos para User.
 * Solo interactúa con Prisma, sin lógica de negocio.
 */
@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }
    /** Selector por defecto: excluye passwordHash de las respuestas */
    private readonly selectPublic = {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        role: {
            select: { id: true, name: true },
        },
    } satisfies Prisma.UserSelect;
    findAll() {
        return this.prisma.user.findMany({
            where: { isActive: true },
            select: this.selectPublic,
        });
    }
    findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: this.selectPublic,
        });
    }
    findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    /** Retorna el usuario con passwordHash y role (para validación de auth) */
    findByEmailWithPassword(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
    }
    create(data: Omit<CreateUserDto, 'password'> & { passwordHash: string }) {
        return this.prisma.user.create({
            data,
            select: this.selectPublic,
        });
    }
    update(id: number, data: Partial<Omit<CreateUserDto, 'password'> & { passwordHash?: string; isActive?: boolean }>) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: this.selectPublic,
        });
    }
    /** Soft delete: marca isActive = false */
    softDelete(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: this.selectPublic,
        });
    }
}
