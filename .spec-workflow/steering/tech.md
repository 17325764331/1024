# 2048 Tech Steering

## Technical Vision
Keep implementation simple, testable, and traceable through the MCP spec workflow.

## Canonical Stack
### Frontend
- Framework: TBD by project implementation.
- Styling: keep consistent and minimal.

### Backend
- Optional, only if online features are introduced.

## Architecture Decisions
1. Use spec-first delivery for all user-facing changes.
2. Keep tasks atomic and tied to requirement IDs.
3. Record implementation artifacts for search and reuse.

## Configuration & Secrets
- Never commit secrets.
- Use environment-based configuration when needed.

## Observability Standards
- Keep logs and test evidence linked to task IDs.
- Ensure failures can be traced to changed modules.

## Testing Strategy
- Unit tests for game logic where available.
- Manual verification for core game flows.
