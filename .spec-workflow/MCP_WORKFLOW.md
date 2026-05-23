# 2048 MCP Workflow

## 1. Purpose
This workflow defines how high-impact changes are modeled, implemented, verified, logged, and rolled back in this project.

MCP means:
- M: Model requirements, assumptions, risks, and acceptance criteria.
- C: Change implementation through small, reviewable, gated tasks.
- P: Prove correctness through tests, logs, rollback evidence, and implementation records.

## 2. Entry Criteria
A change should use this MCP workflow when any of the following are true:
- It changes user-facing behavior.
- It changes persisted data, schemas, migrations, or data ownership.
- It changes authentication, authorization, payment, security, or privacy behavior.
- It introduces or modifies external integrations.
- It may affect production stability, compatibility, observability, or rollback.

## 3. Standard Process
1. Create or update spec files:
   - `.spec-workflow/specs/{spec-name}/requirements.md`
   - `.spec-workflow/specs/{spec-name}/design.md`
   - `.spec-workflow/specs/{spec-name}/tasks.md`
2. Break the work into small tasks with requirement references.
3. Execute tasks in dependency order and move task status:
   - `[ ]` not started
   - `[-]` in progress
   - `[x]` completed
4. For each completed task, record implementation evidence in `Implementation Logs`.
5. Continue only after required quality gates pass.

## 4. Gate Rules
Each phase should define and pass relevant gates:
- Functional gate: acceptance criteria pass.
- Compatibility gate: existing core flows remain valid.
- Safety gate: rollback or mitigation path is documented.
- Observability gate: logs, metrics, or traces can diagnose failures.
- Security gate: secrets, permissions, and sensitive data are handled safely.

## 5. Rollback Strategy
For risky changes:
1. Prefer feature flags or configuration switches when practical.
2. Preserve backward-compatible data migrations when possible.
3. Document rollback commands, config changes, and verification checks.
4. Log incident context, affected identifiers, and recovery actions.

## 6. Current Active Spec
Use this spec for the current goal:
- `.spec-workflow/specs/html-2048-game/requirements.md`
- `.spec-workflow/specs/html-2048-game/design.md`
- `.spec-workflow/specs/html-2048-game/tasks.md`
