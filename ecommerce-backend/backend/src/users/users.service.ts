import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

const SALT_ROUNDS = 10;
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly prisma: PrismaService,
    ) { }
    findAll() {
        return this.usersRepository.findAll();
    }
    async findOne(id: number) {
        const user = await this.usersRepository.findById(id);
        if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        return user;
    }
    async create(dto: CreateUserDto) {
        const existing = await this.usersRepository.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException(`El email ${dto.email} ya está registrado`);
        }
        const { password, ...rest } = dto;
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        return this.usersRepository.create({ ...rest, passwordHash });
    }
    async update(id: number, dto: UpdateUserDto) {
        await this.findOne(id); // lanza NotFoundException si no existe
        const { password, email, ...rest } = dto;
        // Si se quiere cambiar el email, verificar que no esté en uso
        if (email) {
            const existing = await this.usersRepository.findByEmail(email);
            if (existing && existing.id !== id) {
                throw new ConflictException(`El email ${email} ya está en uso`);
            }
        }
        let passwordHash: string | undefined;
        if (password) {
            if (password.length < 8) {
                throw new BadRequestException('La contraseña debe tener al menos 8 caracteres');
            }
            passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        }
        return this.usersRepository.update(id, {
            ...rest,
            ...(email && { email }),
            ...(passwordHash && { passwordHash }),
        });
    }
    async remove(id: number) {
        await this.findOne(id); // lanza NotFoundException si no existe
        return this.usersRepository.softDelete(id);
    }

    /** Busca usuario por email incluyendo passwordHash y role (para auth) */
    findByEmailWithPassword(email: string) {
        return this.usersRepository.findByEmailWithPassword(email);
    }

    /**
     * Crea un usuario con rol CUSTOMER por defecto.
     * Usado por AuthService.register().
     */
    async createForAuth(data: { name: string; email: string; password: string }) {
        const existing = await this.usersRepository.findByEmail(data.email);
        if (existing) {
            throw new ConflictException(`El email ${data.email} ya está registrado`);
        }

        // Buscar el rol CUSTOMER
        const customerRole = await this.prisma.role.findUnique({
            where: { name: 'CUSTOMER' },
        });
        if (!customerRole) {
            throw new InternalServerErrorException(
                'El rol CUSTOMER no existe en la base de datos. Ejecuta el seed primero.',
            );
        }

        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
        return this.usersRepository.create({
            name: data.name,
            email: data.email,
            passwordHash,
            roleId: customerRole.id,
        });
    }
}
