# Roles

## Estado
In Progress — última actualización: 2026-03-18

## Resumen
Maneja las definiciones y asignaciones de roles (Customer, Store Admin, Super Admin).

## Responsabilidades
- Proveer guards o servicios para autorizar peticiones basadas en el rol.
- Gestionar roles de usuarios específicos de plataforma (Store Admin, etc).

## Funciones / Clases / Endpoints clave
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| RolesController | Controller | Endpoints GET/POST para listar roles. |
| RolesService | Service | Lógica de asignación de roles. |
| CreateRoleDto | DTO | Validar el input para crear un rol. |

## Dependencias
- Depende de: Prisma
- Es usado por: Todos los controladores protegidos (Products, Stores, Orders).

## Decisiones técnicas
- [Separación de RBAC]: Los roles y los permisos se extraen en un módulo separado de Users para un mejor control del ciclo de vida y escalabilidad.

## TODOs pendientes
- [ ] Integrar el decorador `@Roles()` con un NestJS Guard real en los controllers.

## Notas importantes
- Para el contexto tenant, se debe considerar que un usuario puede ser `Customer` globalmente, pero pertenecer a un `store_id` específico como Admin.
