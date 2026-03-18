# Multi-Store Ecommerce Backend (Marketplace SaaS)

## Meta general
Crear una plataforma de marketplace SaaS donde múltiples tiendas independientes pueden vender sus productos a través de una única plataforma.

## Objetivos de negocio
- Permitir a los clientes crear una cuenta única y comprar en cualquier tienda.
- Permitir a los dueños de tiendas gestionar su tienda, productos, inventario y pedidos.
- Proveer a un administrador de plataforma (Super Admin) el control sobre todo el ecosistema.
- Cobrar comisiones por ventas en la plataforma central con posibilidad de payouts a las tiendas.

## Alcance (MVP)
- Arquitectura small-to-medium scale (3–10 tiendas inicialmente) pero preparada para escalar.
- Aislamiento lógico de datos por `store_id` en base de datos PostgreSQL compartida.
- Manejo de inventario riguroso por variante a través de transacciones DB.
- Integración de pagos con Stripe (centralizada).
- Configuración de reglas de envío por tienda.

## Restricciones
- Un solo desarrollador en el equipo actualmente.
- Tablas específicas de la tienda deben incluir siempre `store_id` para garantizar multi-tenant.
- Los usuarios (`users`) son globales; las tiendas solo poseen la data de ecommerce.
- Las órdenes siempre deben guardar un snapshot (precio, nombre) del producto y variante en el momento de la compra para consistencia histórica.
- No confiar en el status de pago que reporte el frontend; depender de Stripe Webhooks.

## Criterios de éxito
- Plataforma backend base construida con Clean Modular Architecture en NestJS.
- Preparado para la futura inclusión de Redis, Queue workers y motores de búsqueda.
