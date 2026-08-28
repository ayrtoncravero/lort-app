# LORT — The Lord of the Rings API (Frontend)

LORT is a project that provides a REST API for the world of *The Lord of the Rings*, paired with a web application for browsing its resources and trying out the endpoints directly.

This repository contains the **frontend**. The API itself is a separate project (`lort-api`).

The web app includes:

- Resource browsing (list views with search, filters and pagination)
- Detail views for individual resources
- An interactive **API Explorer** to run real requests against the API
- Interactive **API Documentation** describing the current contract

## Available resources (V1)

All resources are backed by the real LORT API — nothing in this app uses mock data.

| Resource | UI label | List | Detail | Filters |
|---|---|---|---|---|
| Characters | Characters | ✓ | ✓ | name, race, gender |
| Movies | Movies | ✓ | ✓ | name |
| Books | Books | ✓ | ✓ | name |
| Quotes | Quotes | ✓ | ✓ | movieId, characterId |
| Places | Places | ✓ | ✓ | name, type |
| Races | Races | ✓ | ✓ | name, type |
| Ainur | **Gods** | ✓ | ✓ | name, type, characterId |
| Health | — | — | ✓ | — |

Dataset sizes as shipped in LORT API V1 (Home fetches these live via `getAll({ limit: 1 })` — nothing is hardcoded in the app; the numbers below are a snapshot, not a contract): Characters 50, Movies 6, Books 5, Quotes 8, Places 41, Races 19, Ainur (Gods) 23.

`Ainur` is the API's own resource name (`/api/ainur`, matching the Tolkien-canonical term for the order that includes Eru, the Valar and the Maiar). The UI presents it under the friendlier label **Gods** everywhere it's user-facing (Navbar, Footer, Home, `/gods`); Documentation shows it as "Ainur (Gods)" to make the mapping explicit. There is no separate backend endpoint for "gods" — it is the same `/api/ainur` endpoint under a different UI label.

## Architecture

```
Vue UI  →  API client (src/api)  →  LORT API
```

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Vite**
- **Vuetify 3** for UI components and theming
- **Vuex 4** for global UI state (currently an empty store; page-local state stays in components)

Views call typed API client functions (`charactersApi`, `moviesApi`, `booksApi`, `quotesApi`, `placesApi`, `racesApi`, `ainurApi`, `healthApi`), which go through a shared `fetch` wrapper (`src/api/client.ts`). No component makes raw HTTP calls directly.

## Requirements

- Node.js — developed and verified against **v20.11.1**
- pnpm — developed and verified against **v9.15.9**
- A running instance of the LORT API (separate project)

## Backend dependency

This frontend does not include the API. It depends on the LORT API being reachable at the URL configured via `VITE_API_BASE_URL`.

Run the LORT API separately and make sure it is available at the configured `VITE_API_BASE_URL`.

## Installation

```bash
git clone <this-repository-url>
cd lort-app
pnpm install
```

## Environment

Copy the example environment file and adjust it if needed:

```bash
cp .env.example .env
```

```
VITE_API_BASE_URL=http://localhost:3001/api
```

`VITE_API_BASE_URL` must point to a running LORT API instance:

- **Development**: `http://localhost:3001/api` (the value shipped in `.env.example`).
- **Production**: set this to the real, publicly reachable URL of your deployed LORT API instance before building. There is no default production URL — none is invented here, and the value must be supplied at build time (Vite inlines `VITE_*` variables into the build).

Do not commit your `.env` file (it's already git-ignored). `.env.example` is the tracked reference.

## Development

```bash
pnpm dev
```

The app runs at the port configured in `vite.config.ts` (currently `5173`). Vite prints the exact local URL on startup.

## Production build

```bash
pnpm build
pnpm preview
```

`pnpm build` type-checks (`vue-tsc -b`) and then builds with Vite. `pnpm preview` serves the built output locally.

This app uses Vue Router's `createWebHistory` mode. Any static host serving the production build **must** be configured with an SPA fallback/rewrite: every route (e.g. `/characters/3`, `/gods`) has to resolve to `index.html` so client-side routing can take over, otherwise a direct link or a page refresh on a non-root route will 404 at the host level. This README does not assume or configure any specific hosting provider — set up the equivalent of an SPA rewrite rule on whichever platform you deploy to.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint over `.vue`/`.ts`/`.tsx` files |
| `pnpm typecheck` | Run `vue-tsc` without emitting output |

## Features

- Characters browsing (search by name, filter by race/gender)
- Movies browsing (search by name)
- Books browsing (search by name)
- Quotes browsing (filter by movie/character)
- Places browsing (search by name, filter by type)
- Races browsing (search by name, filter by type)
- Gods browsing (search by name, filter by type/character) — UI label for the `/api/ainur` resource
- Server-side pagination on all list views
- Resource detail pages with the live API response shown as JSON
- API Explorer — build and execute real requests against any supported endpoint
- Interactive API Documentation, generated from the same endpoint configuration the Explorer uses
- Loading, error (with retry) and empty states across all data views
- Responsive UI (mobile navigation drawer, adaptive layouts)

## API Explorer

`/explorer` lets you pick a resource and endpoint, fill in query parameters, see the exact request URL, and execute a real HTTP request against the LORT API — no mock data involved. It supports every resource in the table above: Characters, Movies, Books, Quotes, Places, Races, Ainur and Health.

## Documentation

`/docs` contains interactive documentation describing the current API contract — endpoints, parameters, example requests/responses and error formats. Its endpoint list is sourced from the same configuration file the Explorer uses (`src/api/explorerConfig.ts`), so the two never drift apart. `src/api/docsContent.ts` supplies prose and worked examples on top of that structural source of truth — it never redefines which endpoints or params exist.

## Project structure

```
src/
  api/         API client (client.ts), one module per resource, real API types, Explorer/Docs config
  assets/      Global styles
  components/  Reusable UI components (cards, JSON viewer, copy button, etc.)
  layouts/     App shell (navbar + footer wrapper)
  plugins/     Vuetify setup and theme
  router/      Vue Router routes
  store/       Vuex store
  views/       Route-level pages
```

There is no `src/mocks` directory — this app was originally scaffolded against mock data during initial UI development; that mock layer has since been fully removed now that all resources are wired to the real API.

## Screenshots

> Screenshots coming soon.

## License

The LORT source code is licensed under the [MIT License](./LICENSE).

The MIT License applies only to original source code authored for this project. It does not apply to, and grants no rights in, any Tolkien-related characters, names, places, quotations, books, movies, trademarks, or other third-party intellectual property that this application displays or references. That material remains the property of its respective rights holders — see Disclaimer below.

## Disclaimer

LORT is an **unofficial, non-commercial, fan-made** project for exploring characters, places and stories from Middle-earth. It is not affiliated with, endorsed by, or sponsored by the Tolkien Estate, Middle-earth Enterprises, Warner Bros., or any other rights holder connected to J.R.R. Tolkien's works.

This README does not constitute legal advice, and nothing here should be read as a claim of authorization or fair use for any third-party content this project references or displays.
