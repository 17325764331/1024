# 纯 HTML 2048 游戏 Tasks

## Task List

- [x] 1. 搭建页面结构与基础样式
  - File: `index.html`
  - File: `styles.css`
  - _Requirements: FR-001, NFR-004
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: Frontend UI engineer
    - Task: 创建 2048 页面骨架（标题、分数区、棋盘容器、操作按钮、提示区域）并实现移动端可用的基础响应式样式。
    - Restrictions: 不实现复杂动画框架；不要引入外部 UI 库。
    - _Leverage: `design.md` 的模块边界与状态展示要求。
    - _Requirements: FR-001, NFR-004
    - Success: 页面可在桌面和移动端正常显示，具备后续 JS 绑定所需 DOM 结构。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

- [x] 2. 实现棋盘状态与初始化逻辑
  - File: `game.js`
  - File: `index.html`
  - _Requirements: FR-001, NFR-003
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: JavaScript gameplay engineer
    - Task: 在 `game.js` 实现 GameState、4x4 棋盘创建、随机初始 2 个数字块和新游戏重置流程，并完成首次渲染入口。
    - Restrictions: 不在该任务内实现完整移动合并规则；保持状态与渲染职责分离。
    - _Leverage: `requirements.md` 的 FR-001 和 `design.md` 的 2.2/3.1/5.1。
    - _Requirements: FR-001, NFR-003
    - Success: 刷新页面可看到初始棋盘；点击新游戏可重置状态并重新开局。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

- [x] 3. 实现移动、合并、随机生成与计分
  - File: `game.js`
  - _Requirements: FR-002, FR-003, FR-004, NFR-001
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: Algorithm-focused frontend engineer
    - Task: 完成四方向移动与合并算法、单回合单次合并限制、有效移动后生成新块、分数累计与 bestScore 持久化。
    - Restrictions: 不改动页面结构；避免通过重复代码分别写四份近似算法。
    - _Leverage: `design.md` 的 3.2、4.1、5.2 与 Requirement Mapping。
    - _Requirements: FR-002, FR-003, FR-004, NFR-001
    - Success: 合并行为正确，无重复合并 bug；分数与最高分显示正确且刷新后保留最高分。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

- [x] 4. 补齐胜负判定与消息交互
  - File: `game.js`
  - File: `index.html`
  - _Requirements: FR-005, NFR-004
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: UX-focused frontend engineer
    - Task: 增加达成 2048 提示、失败提示、继续游戏和新游戏交互，并确保结束状态行为符合设计。
    - Restrictions: 不引入弹窗库；提示组件使用现有 DOM 区域实现。
    - _Leverage: `requirements.md` FR-005，`design.md` 3.3 与 5.2。
    - _Requirements: FR-005, NFR-004
    - Success: 胜利和失败都可稳定触发并可继续/重开。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

- [x] 5. 增加键盘与触屏输入控制
  - File: `game.js`
  - File: `styles.css`
  - _Requirements: FR-006, NFR-002
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: Cross-platform interaction engineer
    - Task: 实现键盘方向键输入与移动端滑动手势识别（含阈值），处理与页面滚动冲突问题。
    - Restrictions: 不使用第三方手势库；不破坏桌面端键盘体验。
    - _Leverage: `design.md` 4.2 与 6.1 中的 `SWIPE_THRESHOLD_PX`。
    - _Requirements: FR-006, NFR-002
    - Success: 桌面/移动端都可稳定操作，不出现误触发或方向识别反转。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

- [x] 6. 完成验证与发布前检查
  - File: `README.md`
  - File: `game.js`
  - _Requirements: NFR-001, NFR-005
  - _Prompt: Implement the task for spec html-2048-game, first run spec-workflow-guide to get the workflow guide then implement the task:
    - Role: QA and release engineer
    - Task: 执行核心手工测试清单，补充调试开关和关键说明文档（运行方式、操作方式、已知限制）。
    - Restrictions: 不引入测试框架改造；仅补充必要验证与文档。
    - _Leverage: `requirements.md` 验收标准与 `design.md` 第 9 节测试策略。
    - _Requirements: NFR-001, NFR-005
    - Success: 关键场景验证通过，项目可被他人直接打开运行和体验。
    - Instructions: Before starting, change this task from `[ ]` to `[-]`; after completion, call `log-implementation` with detailed artifacts; finally change this task to `[x]`.

## Dependency Order
1 -> 2 -> 3 -> 4 -> 5 -> 6

## Completion Criteria
- All tasks move from `[ ]` to `[x]` through `[-]`.
- Every completed task has a corresponding implementation log.
- All requirement references are implemented or explicitly deferred.
- The game is playable end-to-end in a browser without backend services.

## MVP or Phase Slice
### P0
- `1` 搭建页面结构与基础样式
- `2` 实现棋盘状态与初始化逻辑
- `3` 实现移动、合并、随机生成与计分

### P1
- `4` 补齐胜负判定与消息交互
- `5` 增加键盘与触屏输入控制
- `6` 完成验证与发布前检查

### Recommended Execution Order
`1 -> 2 -> 3 -> 4 -> 5 -> 6`

### Release Exit Criteria
- 核心玩法完整可玩，计分与胜负规则正确。
- 桌面与移动端操作体验可接受。
- 文档与实现日志可支持后续维护与扩展。
