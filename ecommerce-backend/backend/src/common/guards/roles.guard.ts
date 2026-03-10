import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
/**
 * Guard que verifica si el usuario autenticado tiene alguno de los roles requeridos.
 * Requiere que el módulo Auth inyecte `request.user` con la propiedad `role.name`.
 *
 * Uso típico (a nivel controller o handler):
 *   @UseGuards(AuthGuard, RolesGuard)
 *   @Roles(Role.ADMIN)
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        // Si no hay roles requeridos la ruta es pública
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest<{ user?: { role?: { name: string } } }>();
        if (!user?.role?.name) {
            return false;
        }
        return requiredRoles.some((role) => role === user.role!.name);
    }
}