# Fases del Proyecto

### Fase 1: Setup
*Estado: [Done] - 2026-03-20*
- Estructura de repositorios y directorios.
- Iniciar configuración Base y Boilerplate (NestJS, Prisma, Docker).
- Redacción de documentación viva `/docs`.

### Fase 2: Database Schema & Auth
*Estado: [In Progress] - 2026-03-21*
- Modelado del Prisma Schema.
- Módulos `Users` y `Roles` y `Auth` listos e inicializados con Guards JWT globales.

### Fase 3: Multi-tenant & Commerce Foundation
*Estado: [To Do]*
- Módulos de tiendas con aislamiento `store_id`.
- Modelado de catálogos: módulos `Products`, `Variants` e `Inventory` con transacciones de rollback.

### Fase 4: Checkout & Payments
*Estado: [To Do]*
- Creación de pedidos `Orders` y snapshots.
- Webhooks e Integración con Stripe.
- Reglas de envío `Shipping`.

### Fase 5: Admin y Extensibilidad
*Estado: [To Do]*
- Vistas o endpoints para roles de tipo `Super Admin`.
- Funciones de Payouts base o logs para cálculo.
