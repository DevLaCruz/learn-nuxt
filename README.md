# Repo Educativo de Vue y Nuxt

Este repositorio contiene **cuatro proyectos Node.js separados** + un ejemplo sin Node, cada uno con un propósito educativo distinto:

---

## 📁 Estructura

```
LearnVueAndNuxt/
├── intro-vue/           # 📚 Vue 3 sin Node (CDN, script setup en HTML)
├── vue-essentials/      # 🎯 Vue 3 + Vite + TypeScript + Vitest
├── indecision-app       # 🎯 Vue 3 + Vite + TS + Vitest + ESLint + Oxlint + Prettier
├── pokemon-game/        # 🎮 Vue 3 + Vite + TS + Vitest + TailwindCSS + Axios
└── learn-nuxt/          # 🚀 Nuxt 4 + Nuxt UI + Drizzle + Auth + SQLite + Tailwind
```

> **Nota:** `intro-vue` **no es un proyecto Node.js** — es un ejemplo sencillo de Vue 3 vía CDN (script setup en HTML) para entender los conceptos básicos sin herramienta de build.

---

## 🎯 Proyecto 1: `intro-vue` — Vue 3 sin Node (CDN)

> **Objetivo:** Entender la reactividad, componentes y Composition API **sin tooling** (sin Vite, sin Node, sin build).

### Qué incluye
- Vue 3 vía CDN (`<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js">`)
- `<script setup>` en el propio HTML
- Reactividad básica: `ref`, `reactive`, `computed`, `watch`
- Componentes locales, props, emits, slots
- Sin build, sin Node, sin TypeScript — solo HTML/JS puro

### Cuándo usarlo
- Primer contacto con Vue 3 sin instalar nada
- Probar reactividad en el navegador directo
- Prototipos rápidos sin configuración

### Cómo ejecutarlo
```bash
cd intro-vue
# Abre index.html directamente en el navegador
# O con un servidor estático simple:
npx serve .   # o: python -m http.server
```

---

## 🎯 Proyecto 2: `vue-essentials` — Fundamentos de Vue 3 + Vite + TS

> **Objetivo:** Consolidar Vue 3 + Composition API + TypeScript + Vite antes de saltar a Nuxt.

### Stack
| Capa | Tecnología |
|------|------------|
| Framework | **Vue 3.5** (Composition API + `<script setup>`) |
| Build | **Vite 7** |
| Types | **TypeScript 5.9** (strict) |
| Lint/Format | ESLint 10 + Prettier 3 |

### Qué incluye
- Reactividad: `ref`, `reactive`, `computed`, `watch`, `watchEffect`
- Ciclo de vida: `onMounted`, `onUnmounted`, etc.
- Props/Emits con `defineProps` / `defineEmits` tipados
- Composables, `provide/inject`, slots, componentes dinámicos
- TypeScript estricto (`strict: true`, `vue-tsc`)

### Comandos
```bash
cd vue-essentials
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # Build producción (type-check + build)
pnpm preview    # Preview build
```

---

## 🎯 Proyecto 3: `indecision-app` — Vue 3 + Testing + Linting completo

> **Objetivo:** Proyecto Vue 3 completo con testing (Vitest), linting estricto (ESLint + Oxlint) y formateo (Prettier).

### Stack
| Capa | Tecnología |
|------|------------|
| Framework | **Vue 3.5** + **Vite 7** |
| Types | **TypeScript 6** (strict) |
| Test | **Vitest 4** + `@vue/test-utils` + JSDOM + Coverage (V8) |
| Lint | **ESLint 10** + **Oxlint** + `eslint-plugin-vue` + `eslint-plugin-oxlint` |
| Format | **Prettier 3** |
| CSS | **TailwindCSS 4** (Vite plugin) |
| Node | `^20.19.0 \|\| >=22.12.0` |

### Scripts principales
```bash
cd indecision-app
pnpm install
pnpm dev           # Dev server
pnpm build         # type-check + build
pnpm preview       # Preview build
pnpm test          # Vitest watch
pnpm test:unit     # Vitest run
pnpm coverage      # Coverage report
pnpm type-check    # vue-tsc --build
pnpm lint          # oxlint + eslint (con --fix)
pnpm format        # Prettier write
```

---

## 🎮 Proyecto 4: `pokemon-game` — Juego Vue 3 + Tailwind + Axios + Testing

> **Objetivo:** Aplicación tipo juego (Pokédex / batalla) consumiendo API externa (PokéAPI) con UI moderna.

### Stack
| Capa | Tecnología |
|------|------------|
| Framework | **Vue 3.5** + **Vite 8** |
| Types | **TypeScript 6** |
| CSS | **TailwindCSS 4** (Vite plugin) |
| HTTP | **Axios 1.15** |
| UI extras | `canvas-confetti` |
| Test | **Vitest 4** + JSDOM + Coverage |
| Lint/Format | ESLint 10 + Oxlint + Prettier + TypeScript ESLint |
| Node | `^20.19.0 \|\| >=22.12.0` |

### Características
- Consumo de **PokéAPI** (Axios + interceptors)
- UI con **TailwindCSS 4** (nuevo engine, Vite plugin)
- Animaciones con `canvas-confetti`
- Testing unitario con Vitest + JSDOM + Coverage V8
- Linting estricto: ESLint + Oxlint (rápido) + TypeScript ESLint
- Formato consistente con Prettier

### Estructura clave
```
pokemon-game/
├── src/
│   ├── components/      # Componentes UI (PokemonCard, BattleArena, etc.)
│   ├── composables/     # usePokemon, useBattle, etc.
│   ├── services/        # api.ts (axios instance + interceptors)
│   ├── types/           # Tipos TypeScript (Pokemon, BattleState)
│   └── views/           # Vistas principales
├── tests/               # Vitest specs
└── ...
```

### Comandos
```bash
cd pokemon-game
pnpm install
pnpm dev           # Dev server
pnpm build         # type-check + build
pnpm preview       # Preview build
pnpm test:unit     # Vitest run
pnpm lint          # oxlint + eslint --fix
pnpm format        # Prettier write
```

---

## 🚀 Proyecto 5: `learn-nuxt` — Aplicación Real con Nuxt 4 (Full-Stack)

> **Objetivo:** Construir una **aplicación completa tipo SaaS** (catálogo, dashboard, auth, SSR/SSG, base de datos) con todo el ecosistema Nuxt 4.

### Stack principal
| Capa | Tecnología |
|------|------------|
| Framework | **Nuxt 4** (SSR + Prerender/SSG híbrido) |
| UI | **Nuxt UI v4** + **TailwindCSS v4** |
| Base de datos | **SQLite** (archivo local) vía **@libsql/client** (sin bindings nativos C++) |
| ORM | **Drizzle ORM** + **Drizzle Kit** (migraciones + Studio visual) |
| Validación | **Zod v4** |
| Auth | **nuxt-auth-utils** (JWT en cookie httpOnly) |
| Herramientas | TypeScript, `tsx`, `pnpm`, ESLint 9 |

### Características implementadas
- **Páginas públicas prerenderizadas** (`/`, `/about`, `/contact`, `/pricing`, `/products`) con `nitro.prerender`
- **Dashboard protegido** con layout propio y rutas bajo `/dashboard/**`
- **API REST** bajo `server/api/` (productos, sugerencias por tags, reviews, auth login)
- **Paginación reactiva** con composable `usePaginatedProducts`
- **Componentes UI** reutilizables: `UTable`, `UCard`, `UModal`, `UBadge`, `UImg`, pagination, breadcrumbs
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
pnpm db:generate     # Genera migraciones Drizzle
```

---

## 🧭 Por qué esta separación

| Aspecto | `intro-vue` | `vue-essentials` | `indecision-app` | `pokemon-game` | `learn-nuxt` |
|---------|-------------|------------------|------------------|----------------|--------------|
| **Node.js** | ❌ No | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| **Build tool** | ❌ Ninguno | Vite | Vite | Vite | Nuxt/Nitro |
| **TypeScript** | ❌ No | ✅ Strict | ✅ Strict | ✅ Strict | ✅ Strict |
| **Testing** | ❌ No | ❌ No | ✅ Vitest | ✅ Vitest | ❌ No (por ahora) |
| **Lint/Format** | ❌ No | ESLint+Prettier | ESLint+Oxlint+Prettier | ESLint+Oxlint+Prettier | ESLint 9 |
| **CSS** | CDN/Inline | Vanilla CSS | Tailwind 4 | Tailwind 4 | Tailwind 4 + Nuxt UI |
| **Backend/DB** | ❌ No | ❌ No | ❌ No | ❌ API externa | ✅ SQLite + Drizzle + Nitro |
| **Auth** | ❌ No | ❌ No | ❌ No | ❌ No | ✅ JWT + Cookies |
| **Curva aprendizaje** | Muy baja | Baja | Media | Media-Alta | Media-Alta |
| **Foco** | Conceptos base Vue sin build | Fundamentos Vue+TS+Vite | Vue completo + Testing + Lint | App real + API + UI + Testing | Full-stack Nuxt 4 |

> **Recomendación de ruta de aprendizaje:**
> 1. `intro-vue` → Conceptos base sin tooling
> 2. `vue-essentials` → Vue 3 + TS + Vite fundamentos
> 3. `indecision-app` / `pokemon-game` → Proyectos completos con testing, linting, APIs
> 4. `learn-nuxt` → Full-stack con Nuxt 4 (SSR, BD, Auth, UI)

---

## 📦 Gestión de dependencias (pnpm Workspace)

Desde la raíz puedes instalar todo de golpe:

```bash
pnpm install          # Instala deps de los 4 proyectos Node
pnpm -r dev           # Levanta todos en paralelo (si configurado en pnpm-workspace.yaml)
```

Cada proyecto tiene su propio `package.json` y `node_modules` (gracias a `pnpm-workspace.yaml`), evitando conflictos de versiones entre Vue/Vite y Nuxt/Nitro.

---

## 📄 Licencia

MIT — Uso educativo y personal.