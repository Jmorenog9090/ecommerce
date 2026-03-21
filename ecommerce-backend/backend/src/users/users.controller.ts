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
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    /** GET /users — Listar todos los usuarios activos (solo SUPER_ADMIN) */
    @Get()
    @Roles(Role.SUPER_ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    /** GET /users/:id — Obtener un usuario por id */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    /** POST /users — Crear un usuario (solo SUPER_ADMIN) */
    @Post()
    @Roles(Role.SUPER_ADMIN)
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

    /** DELETE /users/:id — Soft delete (solo SUPER_ADMIN) */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
