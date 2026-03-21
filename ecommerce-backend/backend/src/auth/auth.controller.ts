import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /** POST /auth/register — Registro público de usuario (rol CUSTOMER) */
    @Public()
    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /** POST /auth/login — Login público, retorna access_token */
    @Public()
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /** GET /auth/profile — Perfil del usuario autenticado */
    @Get('profile')
    getProfile(@Request() req: { user: { userId: number } }) {
        return this.authService.getProfile(req.user.userId);
    }
}
