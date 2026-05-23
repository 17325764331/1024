# 2048 Structure Steering

## Repository Intent
This repository uses MCP spec-driven documents to manage feature changes from requirements to implementation.

## Top-Level Layout
```text
.spec-workflow/
  MCP_WORKFLOW.md
  steering/
    product.md
    tech.md
    structure.md
  specs/
    {spec-name}/
      requirements.md
      design.md
      tasks.md
      Implementation Logs/
```

## Workflow Conventions
- Requirement updates first in `requirements.md`.
- Design decisions documented in `design.md` before coding.
- Task status flows `[ ]` -> `[-]` -> `[x]` in `tasks.md`.
- Each completed task has an implementation log entry.

## Naming Conventions
- Spec names use kebab-case.
- Requirement IDs use stable labels like `FR-001`, `NFR-001`.
