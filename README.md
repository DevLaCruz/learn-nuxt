# Learn Nuxt - Monorepo Educativo

Este repositorio contiene **dos proyectos separados** organizados como monorepo con `pnpm workspace`, cada uno con un propósito educativo distinto:

---

## 📁 Estructura del Monorepo

```
LearnNuxt/
├── vue-essentials/      # Proyecto 1: Fundamentos de Vue 3
├── learn-nuxt/          # Proyecto 2: Aplicación completa con Nuxt 4
├── pnpm-workspace.yaml  # Configuración de workspaces
└── package.json         # Scripts raíz y dependencias compartidas
```

---

## 🎯 Proyecto 1: `vue-essentials` — Fundamentos de Vue 3

> **Objetivo:** Repasar y consolidar los conceptos básicos de **Vue 3 + TypeScript + Vite** antes de saltar a Nuxt.

### Qué incluye
- Vue 3 con **Composition API** y `<script setup>`
- TypeScript estricto
- Vite como bundler ultrarrápido
- Estructura mínima para enfocarse en: reactividad (`ref`, `reactive`, `computed`), props/emits, composables, ciclo de vida, provide/inject, slots, componentes dinámicos

### Cuándo usarlo
- Si vienes de Vue 2 u otros frameworks y necesitas refrescar la sintaxis moderna
- Para practicar patrones de composición antes de añadir la complejidad de Nuxt (routing, SSR, server routes, etc.)
- Como referencia rápida de "cómo se hace X en Vue puro"

### Comandos
```bash
cd vue-essentials
pnpm install
pnpm dev        # http://localhost:5173
pnpm build
```

---

## 🚀 Proyecto 2: `learn-nuxt` — Aplicación Real con Nuxt 4

> **Objetivo:** Construir una **aplicación completa tipo SaaS** (catálogo de productos, dashboard, autenticación, SSR/SSG, base de datos) usando todo el ecosistema Nuxt 4.

### Stack principal
| Capa | Tecnología |
|------|------------|
| Framework | **Nuxt 4** (SSR + Prerender/SSG híbrido) |
| UI | **Nuxt UI v4** + **TailwindCSS v4** |
| Base de datos | **SQLite** (archivo local) vía **@libsql/client** (sin bindings nativos C++) |
| ORM | **Drizzle ORM** + **Drizzle Kit** (migraciones + Studio visual) |
| Validación | **Zod** |
| Herramientas | TypeScript, `tsx`, `pnpm`, ESLint 9 |

### Características implementadas
- **Páginas públicas prerenderizadas** (`/`, `/about`, `/contact`, `/pricing`, `/products`) con `nitro.prerender`
- **Dashboard protegido** con layout propio y rutas bajo `/dashboard/**`
- **API REST** bajo `server/api/` (productos, sugerencias por tags, reviews, auth login)
- **Paginación reactiva** con composable `usePaginatedProducts`
- **Componentes de UI** reutilizables: `UTable`, `UCard`, `UModal`, `UBadge`, `UImg`, pagination, breadcrumbs
- **Tema y color-mode** persistido (`@nuxt/color-mode`)
- **Iconos** auto-importados (`@nuxt/icon` + Lucide / Heroicons / Simple Icons)
- **Imágenes optimizadas** (`@nuxt/image`)
- **Seed de base de datos** con productos y reseñas realistas
- **Drizzle Studio** para inspeccionar la BD visualmente (`pnpm db:studio`)

### Estructura clave
```
learn-nuxt/
├── app/
│   ├── pages/                    # File-based routing
│   │   ├── (public)/             # Rutas públicas (home, products, pricing...)
│   │   ├── (auth)/               # Login / Register
│   │   └── dashboard/            # Área privada (productos CRUD)
│   ├── components/
│   │   ├── product/              # Card, Reviews, Suggestions
│   │   ├── dashboard/            # Table, Forms, Sidebar
│   │   └── shared/               # Pagination, Breadcrumbs
│   ├── composables/              # usePaginatedProducts, etc.
│   └── layouts/                  # default, dashboard-layout, login-layout
├── server/
│   ├── api/                      # Endpoints Nitro (/api/*)
│   ├── db/                       # Drizzle schema + migraciones
│   └── utils/db.ts               # Instancia @libsql/client
├── shared/                       # Tipos y utils compartidos client/server
├── seed/                         # Scripts de poblado inicial
└── data/database.sqlite          # BD local (gitignored en producción)
```

### Endpoints API relevantes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista paginada de productos |
| GET | `/api/product/:slug` | Detalle de producto |
| GET | `/api/product/:slug/suggestions` | 3 productos relacionados por tags compartidos |
| GET | `/api/home/reviews` | Testimonios para homepage |
| POST | `/api/auth/login` | Login simulado (JWT en cookie httpOnly) |

### Comandos principales
```bash
cd learn-nuxt
pnpm install
pnpm seed            # Pobla la BD con datos de ejemplo
pnpm dev             # Desarrollo en http://localhost:3000
pnpm build           # Build producción (SSG + SSR híbrido)
pnpm preview         # Previsualiza build de producción
pnpm db:studio       # UI visual de Drizzle
pnpm db:push         # Sincroniza schema → BD sin migraciones
```

---

## 🧭 Por qué esta separación

| Aspecto | `vue-essentials` | `learn-nuxt` |
|---------|------------------|--------------|
| **Curva de aprendizaje** | Baja — solo Vue | Media/Alta — Vue + Nuxt + SSR + BD + UI |
| **Foco** | Reactividad, componentes, composición | Arquitectura full-stack, routing, rendering modes, DX de Nuxt |
| **Tiempo para empezar** | ~5 min | ~15 min (BD, seed, UI config) |
| **Ideal para** | Repasar fundamentos, probar ideas rápido | Proyecto portfolio, aprender patrones reales de Nuxt 4 |

> **Recomendación:** Si nunca usaste Composition API o `<script setup>`, empieza en `vue-essentials`. Si ya dominas Vue 3, ve directo a `learn-nuxt`.

---

## 📦 Gestión de dependencias (pnpm Workspace)

Desde la raíz puedes instalar todo de golpe:

```bash
pnpm install          # Instala deps de ambos proyectos
pnpm -r dev           # Levanta ambos en paralelo (si configurado)
```

Cada proyecto tiene su propio `package.json` y `node_modules` (gracias a `pnpm-workspace.yaml`), evitando conflictos de versiones entre Vue/Vite y Nuxt/Nitro.

---

## 📄 Licencia

MIT — Uso educativo y personal.