# Recipes Frontend

This is the single-page frontend for the Recipes app. It's built with Vite + React + Tailwind CSS.

Key features implemented in this branch:
- Atomic-friendly component structure and small utilities under `src/lib` and `src/config`.
- Centralized API client with interceptors (`src/lib/api.js`).
- Improved accessibility and validation in `SearchBar`.
- Lazy-loading for heavier UI pieces (`RecipeGrid` / `RecipeModal`) via `React.lazy` + `Suspense`.
- Environment layering via `.env` / `.env.development` and `src/config`.
- Unit tests with Vitest and Testing Library. Coverage configured in `package.json`.

Getting started

Install dependencies:

```bash
cd recipes-frontend
npm install
```

Run dev server:

```bash
npm run dev
```

Run tests:

```bash
npm test
npm run test:coverage
```

Notes on design decisions

- Config: runtime environment variables are read via `import.meta.env` and exposed from `src/config/index.js` so components import a single source of truth.
- API client: `src/lib/api.js` centralizes axios settings and error normalization so components receive consistent Error objects.
- Lazy-loading: pages and modal UI are loaded with `React.lazy` and `Suspense` to demonstrate code-splitting.
- Accessibility: inputs include labels / aria attributes and validation messages use `aria-live`.

Next steps and suggestions

- Move components into `atoms`/`molecules`/`organisms` directories for stricter atomic design (low-risk refactor already prepared in code style).
- Add E2E tests (Cypress) to validate responsive behavior across devices.
- Integrate an error monitoring service (Sentry, Datadog) using the `componentDidCatch` hook in `ErrorBoundary`.
# Recipes Frontend

This is the single-page frontend for the Recipes app. It is built with React + Vite + TailwindCSS.

Features added and demonstrated:
- Recipe grid list (responsive) showing: name, cuisine, cook time, short instructions and tags.
- Client-side sorting by `cookTimeMinutes` (ascending/descending) without backend calls.
- Client-side filtering by tags (no backend calls).
- Lazy loading of the `RecipeGrid` component with `React.lazy` + `Suspense`.
- Error boundary for graceful UI error handling.
- Atomic-ish component organization and small unit tests using Vitest + Testing Library.

Environment
- The frontend reads `VITE_API_URL` at build/runtime to talk to the backend. Default: `http://localhost:8080/api`.

Quick start

Install dependencies:

```bash
cd recipes-frontend
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run tests:

```bash
npm run test
# or coverage
npm run test:coverage
```

Notes & next steps
- Tests are minimal; add more integration and edge-case tests as needed.
- For large datasets, consider virtualized lists and server-side pagination.
- Tag list is static in the UI; a small improvement is to derive it from fetched recipes.

Design decisions
- Kept changes small and low-risk: lazy loading, error boundary, tests, scripts and README.
- The main client-side sort/filter logic lives in `App.jsx` and operates on local state to avoid API calls.

Enjoy! 🎉
