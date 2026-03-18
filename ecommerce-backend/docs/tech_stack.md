# Tech Stack

## General
- **Backend Framework:** NestJS (Node.js)
  - _Justificación:_ Estructura basada en módulos, inyección de dependencias robusta y soporte nativo para TypeScript. Ideal para una arquitectura Modular Monolith escalable.
- **Language:** TypeScript
  - _Justificación:_ Tipado estático fuerte, reduciendo bugs en tiempo de ejecución y mejorando la Developer Experience.

## Base de Datos & ORM
- **Database:** PostgreSQL
  - _Justificación:_ Estabilidad comprobada, soporte para transacciones robustas (esencial para pagos e inventario), relaciones complejas y JSONB si es requerido en el futuro.
- **ORM:** Prisma
  - _Justificación:_ Client fuertemente tipado generado automáticamente, modelo declarativo sencillo, sistema de migraciones predecible.

## Infraestructura & Despliegue
- **Contenedores:** Docker & Docker Compose
  - _Justificación:_ Aislamiento de dependencias, ambiente de desarrollo idéntico a producción de forma nativa.

## Servicios de Terceros
- **Pagos:** Stripe
  - _Justificación:_ Estándar de la industria para marketplace funds routing y cobro seguro.

## Seguridad & Autenticación
- **Token:** JWT (JSON Web Tokens)
  - _Justificación:_ Autenticación stateless rápida, fácil de adjuntar a requests para validación en APIs REST de clientes y dashboards.
