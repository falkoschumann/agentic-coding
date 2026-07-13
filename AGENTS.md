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

| Command      | What it does                                 |
| ------------ | -------------------------------------------- |
| `make`       | Run full build with all checks               |
| `make build` | Run only the build                           |
| `make test`  | Run all tests                                |
| `make check` | Run all checks, linting and tests            |
| `make fix`   | Fix most of the issues found by `make check` |

## Conventions

- Use domain-driven design specified by esdm yaml files (schemas `/schemas`).
- Use test driven development. Implement only one scenario after another from
  `/features`.
- Implement a hexagonal architecture.

### Source of Truth for Domain Behavior

Commands, queries, aggregates, read models, and events must be derived from the
ESDM core models. Features and acceptance criteria must be derived from the
Given-When-Then feature specifications. The authoritative files are
`todos/todo.esdm.yaml`, `todos/read-models.esdm.yaml`,
`features/todo.esdm.yaml`, and `features/get-todos.esdm.yaml`.

### Implementation Order

Implement exactly one feature scenario at a time from the Given-When-Then files.
Start with a test based on the scenario, then implement, then refactor. A
scenario is only considered complete when all related tests pass and the model
vocabulary remains unchanged.

### Change Rule

If implementation and ESDM model conflict, the ESDM model takes precedence. Make
domain changes in the ESDM files first, then update code and tests. After model
changes, run `esdm lint`.

### Vocabulary Alignment

Names in code, tests, and UI must align with the vocabulary defined in
`schemas/core/v1.yaml` and `schemas/given-when-then/v1.yaml`.

### Definition of Done

A feature scenario is done only if all of the following are true:

- The scenario is implemented one-by-one from the Given-When-Then feature files,
  without bundling multiple scenarios into one change.
- A failing test for the scenario is written first, then implementation is
  added, then refactoring is performed.
- All tests pass via `make test`, including existing tests and the new
  scenario-specific tests.
- All quality checks pass via `make check` (linting, formatting, type checks,
  and tests).
- The implementation uses the same domain terms as the ESDM models and does not
  introduce conflicting vocabulary.
- Commands, events, queries, and read-model behavior match the authoritative
  ESDM definitions and scenario expectations.
- If domain behavior changed during implementation, the ESDM model was updated
  first and validated with `esdm lint` before finalizing code changes.
- No unrelated behavior regressions are introduced in UI, application, domain,
  or infrastructure layers.

### Hexagonal Architecture Rules

The codebase must enforce strict dependency direction and clear port/adapter
boundaries.

- Dependency direction is inward only: UI and infrastructure may depend on
  application and domain, application may depend on domain, and domain must
  depend on nothing outside domain.
- Domain code must be pure and synchronous. It must not import UI frameworks,
  infrastructure concerns, network clients, persistence APIs, or
  runtime-specific libraries.
- Application services orchestrate use cases. They may call domain logic and
  declared ports, but they must not contain framework-specific UI code or
  storage/network implementation details.
- Ports (interfaces) are defined by the application layer based on use-case
  needs, not by infrastructure capabilities.
- Adapters (infrastructure implementations) implement application ports and may
  depend on external libraries, but must not leak infrastructure types into
  application or domain contracts.
- UI interacts only with application use cases (commands and queries) and
  view-facing DTOs. UI must not call infrastructure adapters directly.
- Read-model queries are exposed through application query handlers; UI must not
  read persistence layers directly.
- Cross-layer shortcuts are forbidden, including UI → domain direct mutation and
  domain → infrastructure imports.
- If a new dependency is needed, introduce or extend a port first, then
  implement it in an adapter.

### Allowed Dependency Matrix

- UI → Application: allowed
- UI → Domain: allowed only for shared immutable types; no domain mutation logic
  in UI
- UI → Infrastructure: forbidden
- Application → Domain: allowed
- Application → Infrastructure: forbidden as concrete dependency (allowed only
  through ports)
- Domain → Application: forbidden
- Domain → Infrastructure: forbidden
- Infrastructure → Application: allowed (to implement ports)
- Infrastructure → Domain: allowed (to map and persist domain state)

### DDD to Code Mapping Rules

Domain model elements defined in ESDM must map directly and consistently to code
artifacts.

- Each bounded context maps to one top-level domain module in code, using the
  same bounded context name.
- Each aggregate maps to a dedicated domain module containing:
    - aggregate state type
    - command decision functions
    - event application functions
    - invariant checks
- Commands and queries must keep their ESDM names in code (kebab-case in model,
  project-consistent code naming in TypeScript).
- Events must keep their ESDM names and payload shape. Event payload fields must
  not be renamed or repurposed in domain or application contracts.
- Read models map to explicit projection modules, and queries map to dedicated
  query handlers.
- Actors from ESDM are documentation-only in this project. They describe
  responsibilities and domain language but do not define runtime authorization.
- Given-When-Then scenarios map 1:1 to test cases with scenario names preserved
  or minimally adapted.
- If an ESDM document defines required fields, corresponding code contracts must
  enforce them at compile time and/or runtime validation boundaries.
- Cross-bounded-context concerns must be implemented in integration-oriented
  components (for example process managers or event handlers), not inside
  aggregate logic.

### Naming and File Conventions

- Use ESDM vocabulary as the default naming source for modules, handlers, DTOs,
  and test cases.
- Required implementation structure:
    - `src/application` for command/query handlers, process managers, and
      orchestration services
    - `src/domain` for aggregates, value objects, domain rules, and pure domain
      functions
    - `src/infrastructure` for adapters, repositories, gateways, and external
      integrations
    - `src/ui` for UI components, routes, and user interactions
    - `test/unit` for application/service tests
    - `test/integration` for adapter and gateway integration tests
    - `test/e2e` for end-to-end UI flow tests
- Keep one clear file ownership per concept:
    - aggregate behavior in domain aggregate modules
    - orchestration in application handlers/services
    - external I/O in infrastructure adapters
    - rendering and interaction in UI components
- Avoid synonym drift: do not introduce alternative names for existing ESDM
  concepts.
- New code files should be placed so that their location reflects their
  hexagonal role first, then their domain concept.

### Event Versioning Policy

- Event versioning starts only when a breaking payload/schema change is
  required.
- Non-breaking additive changes keep the same event name and remain backward
  compatible.
- Breaking changes require an explicit new event version name (for example
  added-v2) and coexistence handling during migration.
- Projections and handlers must be updated to process both old and new event
  versions until migration is complete.
- Feature scenarios and tests must be added or updated to cover versioned
  behavior before old versions are removed.

### Runtime and Delivery Baseline

The project must run with pinned and documented toolchain versions.

- Use Bun as the package manager and runtime for scripts and test execution.
- Keep Bun and Node compatibility requirements documented in repository config
  and CI setup.
- Do not introduce alternative package managers in CI or local workflows.
- Ensure deterministic installs and reproducible builds across local and CI
  environments.

### Mandatory Quality Gates

Every change must pass the same gates locally and in CI.

- Build gate: `make build` must pass.
- Test gate: `make test` must pass, including newly added and existing tests.
- Quality gate: `make check` must pass with no remaining lint, formatting, type,
  or test errors.
- Fix workflow: if checks fail, run `make fix` where applicable, then rerun
  `make check`.
- Domain model gate: when ESDM files are changed, `esdm lint` must pass before
  merge.

### Pull Request and Merge Criteria

A change is merge-ready only when all required gates pass.

- Scope is limited to one scenario or one coherent change set.
- No failing checks are allowed at merge time.
- No unrelated refactors are bundled with behavior changes unless explicitly
  declared.
- Acceptance criteria from the corresponding feature scenario are covered by
  tests.

### Release Readiness

A release candidate is valid only if the repository is in a fully green state.

- `make` passes end-to-end.
- No unresolved schema or model validation issues remain.
- No known regressions in implemented scenarios are open.

### UI and UX Implementation Standards

The UI layer must provide consistent behavior, accessibility, and responsiveness
across all todo scenarios.

- UI components must call application use cases only (commands and queries) and
  must not execute domain mutation logic directly.
- Every async interaction must expose explicit idle, loading, success, and error
  UI states.
- User-facing errors must be actionable and non-technical (for example
  validation messages near the affected field).
- Form validation must run both on submit and on relevant field changes, with
  deterministic feedback.
- Keyboard-first usage is required for all primary actions (add, toggle, edit,
  delete, filter).
- Accessibility semantics must be present for interactive elements (labels,
  roles, focus visibility, and screen-reader friendly text).
- UI behavior must be deterministic: the same application state must always
  render the same visible result.
- Filtering, counters, and completion state must always reflect query/read-model
  output, not duplicated client-side assumptions.
- Optimistic updates are allowed only if rollback behavior is explicitly defined
  for failures.
- Route structure and route params must stay stable and documented; route
  changes require test updates.
- Styling must follow the established Bootstrap-based design language unless a
  documented design decision says otherwise.
- The app must be responsive on common mobile and desktop breakpoints without
  feature loss.

### UI Testing Expectations

- Every implemented scenario must have at least one UI-level assertion proving
  visible behavior (rendered list, status change, filter result, or error
  state).
- End-to-end tests must cover critical user flows: create, toggle, edit, delete,
  clear completed, and filter switching.
- UI tests must assert accessibility-relevant behavior where applicable (focus
  movement, keyboard interaction, visible labels).
- Regression tests must be added for every fixed UI bug before the fix is
  merged.

### Document Structure and Maintenance

This file is the operational contract for implementation and review. It must
stay concise, non-duplicative, and enforceable.

- Keep one authoritative rule per topic. If a rule appears in multiple sections,
  consolidate it into a single section and reference that section title.
- Prefer normative language for requirements: use must, must not, and required;
  avoid ambiguous wording such as should when a gate is mandatory.
- Keep section order stable: Scope and Sources, Delivery Rules, Architecture
  Rules, Mapping Rules, Quality Gates, UI Standards, then Reference Notes.
- If explanatory text repeats enforceable rules from earlier sections, keep the
  enforceable rule once and keep explanatory text as non-normative context only.
- Every new policy must include a verification path (for example command, test
  type, or review checklist item).
- Any repository change that updates behavior must be reflected in exactly one
  relevant section of this file.
- Remove outdated rules immediately when they no longer match the current
  toolchain, architecture, or ESDM model.
- Keep examples minimal and aligned with current project vocabulary.
- Run a documentation consistency review before merge to ensure no
  contradictions between sections.

### Governance and Change Control

- Policy changes in this file must be reviewed with the same rigor as code
  changes.
- A pull request is not complete if implementation changed but corresponding
  required policy text was not updated.
- When uncertainty exists, ESDM model files and feature scenarios take
  precedence over informal interpretation.
- If two rules conflict, resolve the conflict in this file before merging
  implementation changes.
