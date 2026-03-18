import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const SALT_ROUNDS = 10;
@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }
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
}
