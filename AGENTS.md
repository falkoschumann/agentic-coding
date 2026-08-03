# Agent Instructions

## Project Overview

- Project vision: As a user, I want to manage a to-do list, so that I have an
  overview of tasks to be done and completed tasks.
- Use domain-driven design with ESDM
- The domain model is described as ESDM in `todos/` with schema
  `schemas/core/v1.yaml`
- BDD features are described as ESDM in `features/` with schema
  `schemas/given-when-then/v1.yaml`
- Place production code in an hexagonal architecture in `src`:
    - `src/application/`: application services
    - `src/domain/`: domain code
    - `src/infrastructure/`: infrastructure code
    - `src/ui/`: UI code
    - `src/shared/`: shared code for cross functional features
- Place test code in `tests`:
    - `tests/unit/`: unit tests
    - `tests/integration/`: integration tests
    - `tests/e2e/`: end-to-end tests and UI tests
    - `tests/data/`: test data

## Tech Stack

- **Frontend:** React 19, React Router 8, TypeScript
- **Backend:** there is no backend, use local storage as persistence
- **Patterns:** domain-driven design, message-driven
- **Styling:** Bootstrap, Bootstrap Icons
- **Build:** make, bun, Vite
- **Testing:** Vitest, Playwright
- **Linting & Formatting:** ESLint, Stylelint, Prettier, Sheriff

## Build and Test Commands

- `make`: run the full build including tests and checks
- `make build`: build the app without tests and checks
- `make test`: run all tests
- `bun run test -- {filter}`: run one or more tests with a filter (vitest)
- `make e2e-tests`: run all end-to-end tests (playwright)
- `make check`: run all checks (linting, formatting, architecture rules)
- `make check-esdm`, `make check-typing`, `make check-eslint`,
  `make check-stylelint`, `make check-prettier` or `make check-sheriff`: run a
  specific check
- `make fix`: try to fix issues found by `make check`
- `make fix-eslint`, `make fix-stylelint` or `make fix-prettier`: fix a specific
  issue

## Code Style Guidelines

- TypeScript with strict mode, no `any`, erasable syntax only and verbatim
  module syntax
- Double quotes
- Use functional patterns for `src/domain/` and `src/ui/`
- Use objectional patterns for `src/application/` and `src/infrastructure`
- Never break the architecture rules (check with `make check-sheriff`):
    - Each folder in `src/` is allowed to import from same folder, `src/shared`
      and `src/domain`
    - `src/application` is also allowed to import from `src/infrastructure`
    - `src/` is allowed to import from any sub folder
- Use `make fix` and `make check` to ensure codestyle

## Testing Instructions

- Implement features one by one
- For each feature loop this 3 steps until the feature is completed:
    1. Before writing any production code, write a test, that should fail
    2. Write only enough code to pass the test
    3. Refactor the production code
- When changing code, change only production code or test code, never both, run
  tests before switching the two
- A feature is completed when all tests and checks are successful
- Prefer deriving tests directly from scenarios in `src/todo.esdm.yaml` and
  `src/get-todos.esdm.yaml`
