# Todos

As a user, I want to manage a to-do list, so that I have an overview of tasks to
be done and completed tasks.

## Tech Stack

- **Frontend:** React 19, React Router 8, TypeScript
- **Backend:** there is no backend
- **Patterns:** domain-driven design, message-driven
- **Styling:** Bootstrap, Bootstrap Icons
- **Storage:** local storage (browser)
- **Build:** make, bun, Vite
- **Testing:** Vitest, Playwright
- **Linting & Formatting:** ESLint, Stylelint, Prettier, Sheriff

## Folder Structure and important Files

- `schemas/core/v1.yaml`: the main JSON schema for ESDM files
- `todos.esdm.yaml`: describe the domain
- `todos/*.esdm.yaml`: describe the bounded context
- `schemas/given-when-then/v1.yaml`: the JSON schema for BDD test files
- `features/*.esdm.yaml`: defines BDD tests
- `src/`: entry point for the application
- `src/application/`: application services
- `src/domain/`: domain code
- `src/infrastructure/`: infrastructure code
- `src/ui/`: entry point for the UI
- `src/ui/assets/`: UI assets, like stylesheet and images
- `src/ui/components/`: shared UI components
- `src/ui/layouts/`: reusable UI layouts
- `src/ui/pages/`: UI pages and helpers in a subfolder per page
- `tests/unit/`: unit tests
- `tests/integration/`: integration tests
- `tests/e2e/`: end-to-end tests and UI tests
- `tests/data/`: test data used by the integration tests

## Important Commands

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

## Current Status & Roadmap

### Done

- Currently, nothing is done

### In Progress

- Currently, nothing is in progress

### Backlog

- Currently, the backlog is empty

## Known Issues & Caveats

- Currently, we have no issues
