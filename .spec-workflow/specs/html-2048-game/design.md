# 纯 HTML 2048 游戏 Design

## 1. Design Goals
- 满足 requirements 中 FR-001~FR-006 与 NFR-001~NFR-005。
- 保持“逻辑层”和“渲染层”解耦，便于后续迭代。
- 在无构建工具场景下仍可直接运行和调试。

## 2. Architecture Overview
### 2.1 System Context
- Frontend: 原生 HTML + CSS + JavaScript。
- Backend: 无。
- Data: 内存中的 GameState + localStorage(bestScore)。
- External systems: 无。

### 2.2 Module Breakdown
1. `game-state`
   - 维护棋盘、分数、胜负状态。
   - 提供初始化、移动、结束判断方法。
2. `game-rules`
   - 封装压缩、合并、计分计算规则。
   - 保证单回合单块不重复合并。
3. `renderer`
   - 将 GameState 渲染为 DOM。
   - 更新分数、最高分、提示状态。
4. `input-controller`
   - 键盘事件与触屏手势监听。
   - 统一转换为方向指令并调用移动流程。
5. `app-bootstrap`
   - 负责初始化、事件绑定、重开逻辑。

## 3. Key Flows
### 3.1 初始化流程
1. 创建空 4x4 棋盘。
2. 生成两个初始数字块。
3. 从 localStorage 读取 bestScore。
4. 首次渲染 UI。

### 3.2 移动流程
1. 输入层产出 direction。
2. 规则层计算新棋盘、合并得分、是否发生变化。
3. 若变化成立，生成新方块并更新 score/bestScore。
4. 检查胜利/失败状态。
5. 渲染层刷新棋盘和状态提示。

### 3.3 结束流程
1. 若出现 2048 且未提示过，则显示胜利提示并设置 won=true。
2. 若棋盘无空位且无可合并相邻块，设置 gameOver=true 并显示失败提示。
3. 用户可点击新游戏进入初始化流程。

## 4. API Design
### 4.1 Internal Function Contracts
- `createInitialState(): GameState`
- `move(state: GameState, direction: Direction): MoveResult`
- `spawnTile(state: GameState): GameState`
- `hasAvailableMoves(board: number[][]): boolean`
- `render(state: GameState): void`

### 4.2 Event Contracts
- `onKeyDown(event)` -> `direction | null`
- `onTouchStart/onTouchEnd` -> `direction | null`（按最小滑动阈值判定）

## 5. Data Model
### 5.1 Entities or Structures
1. `GameState`
   - `board: number[][]`（固定 4x4，0 表示空位）
   - `score: number`
   - `bestScore: number`
   - `won: boolean`
   - `gameOver: boolean`
   - `keepPlaying: boolean`

2. `MoveResult`
   - `board: number[][]`
   - `moved: boolean`
   - `scoreDelta: number`

### 5.2 State Machines
- `playing` -> `won`（达成 2048）
- `playing` -> `gameOver`（无有效移动）
- `won` -> `playing`（选择继续）
- `won/gameOver` -> `playing`（点击新游戏）
- Invalid transitions: `gameOver` 期间不应再响应移动导致状态变化。

## 6. Configuration and Security
### 6.1 Configuration
- `BOARD_SIZE = 4`
- `TARGET_TILE = 2048`
- `NEW_TILE_PROBABILITY = {2: 0.9, 4: 0.1}`
- `SWIPE_THRESHOLD_PX = 24`

### 6.2 Security Strategy
- 无鉴权需求。
- 不接收外部输入数据，不执行动态脚本注入。
- localStorage key 固定命名，避免与其他页面冲突。

## 7. Error Handling and Degradation
- localStorage 不可用时：bestScore 回退为内存值，游戏仍可运行。
- 触屏事件不可用时：保底支持键盘输入。
- 异常方向值输入时：忽略并不更新状态。

## 8. Observability
- 调试开关 `DEBUG_GAME` 控制关键日志输出。
- 日志节点：初始化、每次 move 结果、结束判定。
- 关键渲染步骤函数名清晰，便于断点调试。

## 9. Testing Strategy
- Unit tests（可选）
  - 合并规则边界（如 `[2,2,2,2]` -> `[4,4,0,0]`）。
  - 无变化移动不生成新块。
  - 失败判定与胜利判定正确。
- Manual tests
  - 键盘四方向、触屏四方向。
  - 新游戏按钮重置。
  - 最高分刷新与持久化。

## 10. Requirement Mapping
- FR-001 -> 初始化流程（3.1）+ `createInitialState`
- FR-002 -> 移动流程（3.2）+ `move`
- FR-003 -> `spawnTile`
- FR-004 -> `scoreDelta` 累计 + localStorage 更新
- FR-005 -> 结束流程（3.3）+ `hasAvailableMoves`
- FR-006 -> `input-controller` 事件契约
- NFR-001 -> 规则层轻量计算 + 局部 DOM 更新
- NFR-002 -> 原生浏览器 API 方案
- NFR-003 -> 模块拆分（2.2）
- NFR-004 -> UI 状态反馈 + 响应式布局
- NFR-005 -> 调试日志与可追踪代码路径
