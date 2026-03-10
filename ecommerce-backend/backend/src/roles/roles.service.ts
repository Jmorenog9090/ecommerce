import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) { }
    findAll() {
        return this.prisma.role.findMany({
            include: { _count: { select: { users: true } } },
        });
    }
    findOne(id: number) {
        return this.prisma.role.findUnique({
            where: { id },
            include: { _count: { select: { users: true } } },
        });
    }
    findByName(name: string) {
        return this.prisma.role.findUnique({ where: { name } });
    }
    create(dto: CreateRoleDto) {
        return this.prisma.role.create({ data: dto });
    }
    remove(id: number) {
        return this.prisma.role.delete({ where: { id } });
    }
}
