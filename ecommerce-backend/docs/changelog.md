# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato se basa vagamente en Keep a Changelog.

## [Unreleased] — Fase 2: Database Schema & Auth

### Added
- **Prisma Schema expandido:** modelos `Store`, `Product`, `Variant`, `Inventory`, `Order`, `OrderItem`, `ShippingRule` con enums `OrderStatus` y `ShippingType`.
- **Auth module:** `AuthController`, `AuthService`, `JwtStrategy` con endpoints `POST /auth/register`, `POST /auth/login`, `GET /auth/profile`.
- **Guards globales JWT:** `JwtAuthGuard` registrado como `APP_GUARD`; decorador `@Public()` para excepciones.
- **RolesGuard global:** se ejecuta tras el JWT guard; endpoints sensibles protegidos con `@Roles(Role.SUPER_ADMIN)`.
- **DTOs:** `RegisterDto`, `LoginDto`.
- `UsersService.createForAuth()` y `UsersRepository.findByEmailWithPassword()`.
- Variables de entorno `JWT_SECRET`, `JWT_EXPIRATION`.
- Documentación completa de `auth.md`.

### Changed
- **Role enum alineado:** `ADMIN`/`MODERATOR` → `CUSTOMER`, `STORE_ADMIN`, `SUPER_ADMIN`.
- `UsersController`: endpoints `findAll`, `create`, `remove` protegidos con `@Roles(Role.SUPER_ADMIN)`.
- `RolesController`: endpoints `create`, `remove` protegidos con `@Roles(Role.SUPER_ADMIN)`.
- `AppModule` actualizado con imports de `AuthModule` y providers de guards globales.
- `phases.md`: Fase 1 marcada como Done, Fase 2 como In Progress.

---

## [Fase 1] — 2026-03-20
### Added
- Documentación inicial viva (`idea.md`, `planning.md`, `phases.md`, `tech_stack.md`, `architecture.md`, `changelog.md`).
- Documentación base para módulos en progreso (`users`, `roles`).
- Archivos `.gitignore` (unificado), `README.md` a las convenciones de la arquitectura.

### Changed
- Unificado `.gitignore` en la raíz (incluyendo reglas previas y `SKILLS`).
- Eliminado `.env.example` y centralizado en un único `.env`.
