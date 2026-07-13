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

| Command      | What it does                                |
| ------------ | ------------------------------------------- |
| `make`       | Run full build with all checks              |
| `make build` | Run only the build                          |
| `make test`  | Run all tests                               |
| `make check` | Run all checks, linting and tests           |
| `make fix`   | Fix most of the issues found by `make check |

## Conventions

- Use domain-driven design specified by esdm yaml files (schemas `/schemas`).
- Use test driven development. Implement only one scenario after another from
  `/features`.
- Implement an hexagonal architecture.

## Architecture Notes

### Hexagonal Architecture

- **Application services:** `/src/application` contains command handlers, query
  handlers, process managers and event handlers. Orchestrate domain and
  infrastructure. Use object oriented code style and an asynchronous API.
- **Domain:** `/src/domain` contains aggregates, commands, read-models, queries
  and value-objects. Use functional code style and a synchronous API.
- **Infrastructure:** `/src/infrastructure` contains repositories and gateways
  to external systems. Use object oriented code style and an asynchronous API.
- **UI:** `/src/ui` contains the user interface and use the application services
  to provide features.

### Tests Organization

- Use a separate source tree `test` for all tests.
- Use `test/unit` for tests of the application services.
- Use `test/integration` for tests of repositories and gateways.
- Use `test/e2e` for UI tests.
