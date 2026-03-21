# Auth

## Estado
In Progress — última actualización: 2026-03-21

## Resumen
Módulo de autenticación basado en JWT (JSON Web Tokens). Maneja registro de usuarios, login con credenciales, y protección global de rutas.

## Responsabilidades
- Registro de nuevos usuarios con rol `CUSTOMER` por defecto.
- Validación de credenciales (email + contraseña) y emisión de tokens JWT.
- Protección global de todas las rutas mediante `JwtAuthGuard`.
- Provisión del usuario autenticado en `request.user` para el resto de la app.

## Funciones / Clases / Endpoints clave
| Nombre | Tipo | Descripción |
|--------|------|-------------|
| AuthController | Controller | Endpoints `/auth/register`, `/auth/login`, `/auth/profile`. |
| AuthService | Service | Lógica de registro, login y generación de tokens. |
| JwtStrategy | Strategy | Estrategia Passport que valída y decodifica tokens JWT. |
| JwtAuthGuard | Guard | Guard global que protege todas las rutas (excepto `@Public()`). |
| RegisterDto | DTO | Validación del body de registro (name, email, password). |
| LoginDto | DTO | Validación del body de login (email, password). |
| @Public() | Decorator | Marca rutas como públicas (sin requerir JWT). |

## Dependencias
- Depende de: UsersModule (para crear y buscar usuarios), @nestjs/jwt, @nestjs/passport, passport-jwt
- Es usado por: Todos los módulos (JWT guard global protege todo)

## Decisiones técnicas
- [Guard Global]: Se registra `JwtAuthGuard` como `APP_GUARD` en `AppModule`. Esto protege todas las rutas por defecto; las excepciones se marcan con `@Public()`.
- [RolesGuard como segundo APP_GUARD]: Se ejecuta después del JWT guard para verificar `@Roles()`.
- [createForAuth en UsersService]: El Auth no accede a Prisma directamente; delega la creación de usuarios a `UsersService` para mantener el Repository Pattern.

## TODOs pendientes
- [ ] Implementar refresh tokens.
- [ ] Añadir endpoint de logout (blacklist de tokens o short-lived tokens + refresh).
- [ ] Rate-limiting en login para prevenir fuerza bruta.

## Notas importantes
- El JWT payload contiene `{ sub: userId, email, role }`. El `role` es el nombre del rol (string).
- `JWT_SECRET` y `JWT_EXPIRATION` se configuran en `.env`.
- Para que el registro funcione, debe existir el rol `CUSTOMER` en la tabla `Role`.
