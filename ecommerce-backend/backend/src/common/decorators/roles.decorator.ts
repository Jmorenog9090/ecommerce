import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';
export const ROLES_KEY = 'roles';
/**
 * Decorador para proteger rutas por rol.
 * Uso: @Roles(Role.ADMIN, Role.MODERATOR)
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);