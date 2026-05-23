# Tasks Document

## Feature Name
`{spec-name}`

## Task List

- [ ] 1. Define domain model and contracts
  - Files: `src/...`
  - Requirements: `FR-001`
  - _Prompt: Implement the task for spec {spec-name}, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: Senior backend engineer
    - Task: Define or update domain model and external contracts according to design.md
    - Restrictions: Do not change unrelated modules or public APIs not listed in design
    - _Leverage: Existing model definitions, validators, shared error types
    - _Requirements: FR-001
    - Success: Contracts compile, validations pass, no unrelated diff
    - Also update task status in tasks.md from [ ] to [-] before coding, call log-implementation after completion, then mark [-] to [x].

- [ ] 2. Implement core business logic
  - Files: `src/...`
  - Requirements: `FR-002`
  - _Prompt: Implement the task for spec {spec-name}, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: Full-stack engineer
    - Task: Implement core logic and integration paths described in design.md
    - Restrictions: No broad refactors; keep compatibility with existing interfaces
    - _Leverage: Existing services/utilities and error handling patterns
    - _Requirements: FR-002
    - Success: Main scenario works and tests cover core branches
    - Also update task status in tasks.md from [ ] to [-] before coding, call log-implementation after completion, then mark [-] to [x].

- [ ] 3. Add tests and verification
  - Files: `tests/...` or `src/...`
  - Requirements: `FR-003`
  - _Prompt: Implement the task for spec {spec-name}, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: QA-focused engineer
    - Task: Add or update automated/manual verification cases for acceptance criteria
    - Restrictions: Do not rewrite test framework setup unless required
    - _Leverage: Existing test harness and fixtures
    - _Requirements: FR-003
    - Success: New/updated tests pass and map to requirements
    - Also update task status in tasks.md from [ ] to [-] before coding, call log-implementation after completion, then mark [-] to [x].

## Notes
- Keep tasks atomic (prefer 1-3 files each).
- Each task should map clearly to requirement IDs.
