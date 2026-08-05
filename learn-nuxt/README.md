# 🚀 Learn Nuxt 4 - Proyecto Educativo

Este es un proyecto educativo completo diseñado para aprender y practicar **Nuxt 4**, integración de **Nuxt UI**, gestión de base de datos local con **SQLite** + **Drizzle ORM** (usando `@libsql/client`), paginación, componentes SSR/Prerender y arquitectura de aplicaciones modernas con Vue 3 y TypeScript.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Nuxt 4](https://nuxt.com/) (SSR & SSG)
- **UI & Estilos:** [Nuxt UI v3/v4](https://ui.nuxt.com/) + [TailwindCSS v4](https://tailwindcss.com/)
- **Base de Datos:** SQLite con [`@libsql/client`](https://github.com/tursodatabase/libsql-client-ts) (sin dependencias C++ nativas)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (`drizzle-orm/libsql`) + [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)
- **Lenguaje & Herramientas:** TypeScript, `tsx`, `zod`, `bun`

---

## 📁 Estructura del Proyecto

```text
LearnNuxt/
├── app/                        # Aplicación Nuxt (Nuxt 4 directory structure)
│   ├── assets/                 # Estilos globales (main.css)
│   ├── components/             # Componentes reusables (Home, Products, Shared, Dashboard, Modal)
│   ├── composables/            # Lógica reactiva y llamadas API (usePaginatedProducts.ts)
│   ├── layouts/                # Diseños de página (default, dashboard-layout, login-layout)
│   ├── pages/                  # Rutas de la aplicación ((public), (auth), dashboard)
│   ├── utils/                  # Helpers del cliente
│   ├── app.vue                 # Raíz de la app Vue
│   └── app.config.ts           # Configuración del tema y colores
├── server/                     # Backend Nitro
│   ├── api/                    # Endpoints de API (/api/hello-world, /api/home/reviews, /api/products)
│   ├── db/                     # Esquemas de Drizzle (schema.ts) y migraciones
│   └── utils/                  # Instancia de la base de datos SQLite con @libsql/client (db.ts)
├── shared/                     # Código compartido entre cliente y servidor
│   ├── utils/                  # Formateadores (format-currency.ts)
│   └── types/                  # Definición de interfaces y tipos
├── data/                       # Almacenamiento local de base de datos (database.sqlite)
├── seed/                       # Scripts de datos iniciales para la base de datos (seed-database.ts)
├── drizzle.config.ts           # Configuración de Drizzle Kit
└── nuxt.config.ts              # Configuración principal de Nuxt 4 y Nitro
```

---

## 🚀 Guía de Inicio

### 1. Cambio a Node LTS (Recomendado)

En tu terminal puedes seleccionar la versión LTS usando `nvm`:

```bash
nvm use --lts
```

### 2. Instalación de Dependencias

```bash
bun install
```

> **Nota:** Al usar `@libsql/client`, la conexión a SQLite no utiliza binarios C++ nativos (`.node`), por lo que no sufrirás errores de versionado de Node (`NODE_MODULE_VERSION`) ni requerirás recompilaciones nativas al cambiar de versión de Node.js.

### 3. Poblar la Base de Datos (Seeding)

Para insertar los productos y testimonios iniciales en `data/database.sqlite`:

```bash
bun run seed
```

### 4. Servidor de Desarrollo

Inicia la aplicación en modo desarrollo en `http://localhost:3000`:

```bash
bun run dev
```

### 5. Construcción y Producción

Para compilar y verificar el paquete de producción:

```bash
bun run build
bun run preview
```

---

## 🗄️ Comandos de Base de Datos (Drizzle Kit)

- **Push a la base de datos:** `bun run db:push`
- **Generar migraciones:** `bun run db:generate`
- **Abrir Drizzle Studio (interfaz visual):** `bun run db:studio`
