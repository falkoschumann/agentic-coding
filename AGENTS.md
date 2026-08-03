# Agent Instructions

Read the `PROJECT.md` first to understand the current state and architecture
rules before writing any code.

## Project Overview

- Use domain-driven design using ESDM
- The domain model is described in `todos/todos.esdm.yaml` and
  `todos/read-models.esdm.yaml`
- BDD features are described in `features/todo.esdm.yaml` and
  `features/get-todos.esdm.yaml`
- Place production code in an hexagonal architecture in `src`
- Place test code in `tests`
- Use local storage as persistence (no backend)

## Build and Test Commands

- `make`: run the full build including tests and checks
- `make test`: run all tests
- `bun run test -- {filter}`: run one or more tests with a filter (vitest)
- `make e2e-tests`: run all end-to-end tests (playwright)
- `make check`: run all checks (linting, formatting, architecture rules)
- `make fix`: try to fix issues found by `make check`; run `make fix` first and
  re-check with `make check` before fix issues manually

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
