# Agents Instructions

## Project Overview

This is a a web application for managing todos.

## Stack

- **Language:** TypeScript
- **Framework:** React
- **Routing:** React Router
- **Styling**: Bootstrap
- **Testing:** Vitest
- **Bundling:** Vite
- **Linting**: ESLint, Prettier, Stylelint
- **Verify architecture rules**: Sheriff
- **Package manager:** Bun

## Build and Test commands

- Run `bun install` to install dependencies.
- Run `bun run test` to run all tests.
- To focus on one step, add the vitest pattern
  `bun run test -- -t "<test name>"`.
- Run `bun run lint` to run the linting tools.
- When linting issues found, first run `bun run lint:fix` to automatically
  resolve them, and then run `bun run lint` before attempting to fix the issues
  yourself.
- Run `bun run lint:arch` to verify the architecture rules.

### Implementation Order

- Implement exactly one slice at a time.
- A slice includes a command or query, the tests for the feature and the UI
  using the command or query.
- Implement exactly one scenario at a time from the feature files.
- Start with a test based on the scenario, then implement, then refactor.
- A scenario is only considered complete when the build is successfully, all
  related tests pass, the linter runs without issue and the architecture rules
  are being followed.
- The `*.esdm.yaml` files must not be changed.

## Code Style Guidelines

- Use domain driven design as specified by ESDM within the files
  `todos/todo.esdm.yaml` and `todos/read-models.esdm.yaml`.
- Use the functional core, imperative shell pattern.
- Create a module for each aggregate, command, event, read-model and query in
  `src/domain`.
- The domain must be pure functional.
- Create repositories in `src/infrastructure`.
- Implement the infrastructure object oriented.
- Create application service in `src/application`.
- An application service is a class that orchestrate the domain and the
  infrastructure.
- Implement a application service as class.
- Create the UI in `src/ui`.
- The UI uses application services to interact with the domain.

## Testing Instructions

- Use test-driven development and create a test for each feature with the files
  `features/todos.esdm.yaml` and `get-todos.esdm.yaml`.
- Create unit tests in `test/unit`.
- Create integration tests in `test/integration`.
