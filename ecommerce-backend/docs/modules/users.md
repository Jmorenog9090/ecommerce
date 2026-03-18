# Users

## Estado
In Progress — última actualización: 2026-03-18

## Resumen
Gestiona el ciclo de vida de los usuarios globales de la plataforma.

## Responsabilidades
- Creación y actualización de perfiles de usuario.
- Interfaz con la base de datos para la entidad User.
- Lógica de negocio para manejar datos del usuario.

## Funciones / Clases / Endpoints clave
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| UsersController | Controller | Endpoints REST para CRUD de usuarios. |
| UsersService | Service | Lógica de negocio para registro y edición. |
| UsersRepository | Repository | Abstracción de Prisma para aislar acceso a DB. |

## Dependencias
- Depende de: Prisma
- Es usado por: Auth (para validar login y generar tokens)

## Decisiones técnicas
- [Repository Pattern]: Se usa `users.repository.ts` para no acoplar el servicio directamente con `prisma.service`.

## TODOs pendientes
- [ ] Conectar con JWT guards.
- [ ] Completar flujos de actualización de perfiles.

## Notas importantes
- La tabla de `users` es global y no pertenece a ninguna tienda específica.
