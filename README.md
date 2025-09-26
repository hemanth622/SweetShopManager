# SweetShopManager

Modern full-stack sweet shop management app built with Express, Vite + React, TailwindCSS, and Drizzle ORM.

## Quick Start

AI used :
  Replit

```bash
# 1) Install dependencies
npm install

# 2) Run in development
npm run dev
# App serves API and client on http://localhost:5000

# 3) Build for production
npm run build

# 4) Start production build
npm run start
```

- The server listens on the `PORT` environment variable (defaults to `5000`).
- On Windows, environment variables are set via `cross-env` in `package.json` scripts.

## Tech Stack
- Backend: Express (TypeScript)
- Frontend: Vite + React + TypeScript
- Styling: TailwindCSS (+ shadcn/ui components)
- Data Layer: Drizzle ORM (see `drizzle.config.ts`, `shared/schema.ts`)
- Tooling: Vite, esbuild, tsx, PostCSS

## Scripts
- `npm run dev`: Starts Express and Vite in development via `tsx`
- `npm run build`: Builds client with Vite and bundles server to `dist/`
- `npm run start`: Runs production server from `dist/index.js`
- `npm run check`: Type-checks with `tsc`
- `npm run db:push`: Applies Drizzle schema changes (requires DB config)

## Project Structure
```
client/           # Vite + React app
server/           # Express server (TypeScript)
shared/           # Shared types/schema
vite.config.ts    # Vite config
package.json      # Scripts and deps
```

## Environment
Set environment variables as needed:
- `PORT`: Port for the combined server (default `5000`)
- Database connection details if you wire up Drizzle to a real DB (see `server/db.ts` and `drizzle.config.ts`).

## Notes
- If you see Browserslist or PostCSS warnings in dev, you can update the local DB:
  ```bash
  npx update-browserslist-db@latest
  ```
- Windows specific: scripts use `cross-env` so `NODE_ENV` works reliably.

## License
MIT
