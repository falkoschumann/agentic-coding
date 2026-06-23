# Todos App

A web app to manage todos.

## Stack

- **Framework:** React
- **Routing:** React Router with declarative mode
- **Styling**: Bootstrap
- **Language:** TypeScript
- **Testing:** Vitest
- **Package manager:** Bun
- **Bundling:** vite
- **Linting**: eslint, prettier, stylelint, sheriff

## Commands

| Command              | What it does                                      |
| -------------------- | ------------------------------------------------- |
| `bun run dev`        | Start dev server                                  |
| `bun run build`      | Production build                                  |
| `bun test`           | Run all Vitest tests                              |
| `bun run test:watch` | Run tests in watch mode                           |
| `bun run lint`       | Run linter                                        |
| `bun run typecheck`  | Run TypeScript type checking                      |
| `bun run ci`         | Full CI pipeline: lint → typecheck → test → build |

## Conventions

- Use domain-driven design specified by esdm yaml files (schemas `/schemas`).
- Use test driven development.
- Implement an hexagonal architecture.

## Architecture notes

- **Application services:** `/src/application` contains the imperative shell
  (object oriented and asynchronous)
- **Domain:** `/src/domain` contains the functional core (functional and
  synchronous)
- **Infrastructure:** `/src/infrastructure` contains the infrastructure adapter
  used by the application services (object oriented andasynchronous)
- **UI:** `/src/ui` contains the user interface
- **Tests:** use a separate source tree: `test/unit`, `test/integration` and
  `test/e2e`.

## Setup

```bash
bun install
bun run dev
```
