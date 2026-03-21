import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Registra un nuevo usuario con rol CUSTOMER por defecto.
     * Retorna el access_token JWT.
     */
    async register(dto: RegisterDto) {
        // UsersService.create ya maneja el ConflictException si el email existe
        const user = await this.usersService.createForAuth({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });

        const token = this.generateToken(user.id, user.email, user.role.name);
        return { access_token: token };
    }

    /**
     * Valida credenciales y retorna un JWT.
     */
    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmailWithPassword(dto.email);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('La cuenta está desactivada');
        }

        const token = this.generateToken(user.id, user.email, user.role.name);
        return { access_token: token };
    }

    /**
     * Retorna datos del perfil del usuario autenticado.
     */
    async getProfile(userId: number) {
        return this.usersService.findOne(userId);
    }

    private generateToken(userId: number, email: string, roleName: string): string {
        const payload = { sub: userId, email, role: roleName };
        return this.jwtService.sign(payload);
    }
}
