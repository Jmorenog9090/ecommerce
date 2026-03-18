# Multi-Store Ecommerce Backend

Plataforma SaaS multi-tenant que permite a múltiples tiendas gestionar inventario y pedidos desde una estructura monolítica compartida.

## Tecnologías Principales
- **NestJS** + **TypeScript**
- **Prisma ORM** + **PostgreSQL**
- **Docker** & **Docker Compose**
- **Stripe**

## Estructura
El proyecto está construido bajo una Arquitectura Limpia Modular Monolith, con aislamiento por `store_id`.

Para más contexto y documentación viva, por favor revisa la carpeta `/docs`.
Especialmente:
- `/docs/idea.md` - Alcance del proyecto
- `/docs/architecture.md` - Arquitectura
- `/docs/modules/` - Documentación por módulo (estado, responsabilidades)

## Requisitos Previos
- Node.js (v20 o superior recomendado)
- Docker & Docker Compose
- NPM o Yarn

## Variables de Entorno
Copia el archivo `.env.example` a `.env` en la raíz (y dentro de `backend/` si es necesario) y rellena los valores:
\`\`\`bash
cp .env.example .env
\`\`\`

## Instalación y Arranque
\`\`\`bash
# 1. Levantar base de datos y dependencias en Docker
docker-compose up -d

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Aplicar migraciones base y generar cliente de Prisma
npx prisma generate
npx prisma migrate dev

# 4. Iniciar el servidor local
npm run start:dev
\`\`\`

---
*Este proyecto usa documentación viva en `/docs`. Por favor actualízala si cambias algún módulo base.*
