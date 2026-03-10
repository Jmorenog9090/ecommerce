import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const role = await this.rolesService.findOne(id);
        if (!role) throw new NotFoundException(`Role con id ${id} no encontrado`);
        return role;
    }
    @Post()
    async create(@Body() dto: CreateRoleDto) {
        const existing = await this.rolesService.findByName(dto.name);
        if (existing) throw new ConflictException(`El rol "${dto.name}" ya existe`);
        return this.rolesService.create(dto);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        const role = await this.rolesService.findOne(id);
        if (!role) throw new NotFoundException(`Role con id ${id} no encontrado`);
        await this.rolesService.remove(id);
    }
}
