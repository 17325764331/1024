# MCP 规范工作流

此目录用于 Spec-Driven Development：`Requirements -> Design -> Tasks -> Implementation`。

## 目录说明

- `templates/`：默认模板
- `user-templates/`：可覆盖默认模板
- `specs/`：每个功能规范（kebab-case）
- `steering/`：可选项目级指导文档（product/tech/structure）

## 快速开始

1. 选一个功能名（kebab-case），例如 `user-authentication`
2. 基于 `templates/requirements-template.md` 生成：
   - `.spec-workflow/specs/{spec-name}/requirements.md`
3. 审批通过后继续生成：
   - `design.md`
   - `tasks.md`
4. 实现时按 `tasks.md` 勾选状态：`[ ] -> [-] -> [x]`

## 任务状态约定

- `[ ]` 待开始
- `[-]` 进行中
- `[x]` 已完成
