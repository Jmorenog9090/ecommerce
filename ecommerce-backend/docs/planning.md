# Plan Maestro

## Milestones y Tareas Priorizadas (MVP)

1. **Prisma schema** - Definir la estructura base de PostgreSQL (`User`, `Store`, `Order`, `Product`, etc)
2. **Authentication system** - Autenticación global JWT
3. **Users module** - CRUD de usuarios e integración auth globales
4. **Stores module** - Endpoints y servicio para gestionar las tiendas como tenant
5. **Products module** - Catálogo de productos con `store_id`
6. **Variants + inventory** - Opciones de variante, stock, reducciones atómicas
7. **Orders** - Workflows de pedido, sub-pedidos por variante, persistir snapshots de nombres/precio
8. **Stripe integration** - Flujos PaymentIntent y validación de Webhook
9. **Shipping rules** - Lógica de envíos flat-rate y condicional
10. **Admin tools** - Vista administrativa de todas las ordenes / tiendas

## Estimaciones
*(Por definir según velocidad)*
- Setup / Boilerplate: 20%
- Core E-commerce / DB: 40%
- Stripe Integration / Pagos: 25%
- Features Adicionales (admin, shipping): 15%

## Riesgos y Consideraciones Técnicas
- **Condiciones de carrera en inventarios:** Usar transacciones SQL consistentes para reservar stock bajo carga.
- **Webhooks Stripe falsificados:** Validar el payload del webhook siempre con la firma secreta de Stripe para garantizar que el pago proviene de ellos empíricamente.
- **Multi-tenant isolation:** Implementar mecanismos (ej. middleware globales o interceptors) que faciliten o inyecten el chequeo de permisos sobre el `store_id` sin llenar cada controller de validación duplicada.
- **Snapshot Pricing:** Almacenar explícitamente el precio final cobrado en `OrderItem` y el nombre en caso de que cambien en base de datos.
