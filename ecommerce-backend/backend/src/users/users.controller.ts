import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    /** GET /users — Listar todos los usuarios activos */
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    /** GET /users/:id — Obtener un usuario por id */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }
    /** POST /users — Crear un usuario (contraseña hasheada automáticamente) */
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }
    /** PATCH /users/:id — Actualizar parcialmente un usuario */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        return this.usersService.update(id, dto);
    }
    /** DELETE /users/:id — Soft delete (isActive = false) */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
