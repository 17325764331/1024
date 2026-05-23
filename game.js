(() => {
  const BOARD_SIZE = 4;
  const TARGET_TILE = 2048;
  const NEW_TILE_FOUR_PROBABILITY = 0.1;
  const SWIPE_THRESHOLD_PX = 24;
  const BEST_SCORE_KEY = "game2048.bestScore";
  const DEBUG_GAME = false;

  const Direction = Object.freeze({
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
  });

  const dom = {
    board: document.getElementById("board"),
    score: document.getElementById("score"),
    bestScore: document.getElementById("best-score"),
    message: document.getElementById("message"),
    overlay: document.getElementById("status-overlay"),
    overlayText: document.getElementById("status-text"),
    newGameBtn: document.getElementById("new-game"),
    continueBtn: document.getElementById("continue-game"),
    boardWrap: document.querySelector(".board-wrap"),
  };

  let touchStart = null;
  let state = createInitialState();

  init();

  function init() {
    bindEvents();
    render(state);
    log("init", state);
  }

  function bindEvents() {
    document.addEventListener("keydown", handleKeyDown);
    dom.newGameBtn.addEventListener("click", () => {
      state = createInitialState();
      render(state);
      announce("已开始新游戏");
    });

    dom.continueBtn.addEventListener("click", () => {
      state.keepPlaying = true;
      hideOverlay();
      dom.continueBtn.hidden = true;
      announce("继续挑战更高分");
    });

    dom.boardWrap.addEventListener(
      "touchstart",
      (event) => {
        if (!event.changedTouches[0]) {
          return;
        }
        touchStart = {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };
      },
      { passive: true },
    );

    dom.boardWrap.addEventListener("touchend", (event) => {
      if (!touchStart || !event.changedTouches[0]) {
        return;
      }
      const end = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
      const direction = getSwipeDirection(touchStart, end);
      touchStart = null;
      if (direction) {
        processMove(direction);
      }
    });
  }

  function handleKeyDown(event) {
    const keyMap = {
      ArrowUp: Direction.UP,
      ArrowDown: Direction.DOWN,
      ArrowLeft: Direction.LEFT,
      ArrowRight: Direction.RIGHT,
      w: Direction.UP,
      s: Direction.DOWN,
      a: Direction.LEFT,
      d: Direction.RIGHT,
      W: Direction.UP,
      S: Direction.DOWN,
      A: Direction.LEFT,
      D: Direction.RIGHT,
    };

    const direction = keyMap[event.key];
    if (!direction) {
      return;
    }

    event.preventDefault();
    processMove(direction);
  }

  function processMove(direction) {
    if (state.gameOver) {
      return;
    }
    if (state.won && !state.keepPlaying) {
      return;
    }

    const result = move(state, direction);
    if (!result.moved) {
      announce("该方向无法移动");
      return;
    }

    state.board = result.board;
    state.score += result.scoreDelta;
    if (state.score > state.bestScore) {
      state.bestScore = state.score;
      saveBestScore(state.bestScore);
    }

    state = spawnTile(state);

    if (!state.won && hasReachedTarget(state.board, TARGET_TILE)) {
      state.won = true;
      showOverlay("恭喜！你达成了 2048", false);
      dom.continueBtn.hidden = false;
      announce("你已经达成 2048，可继续挑战");
    }

    if (!hasAvailableMoves(state.board)) {
      state.gameOver = true;
      showOverlay("游戏结束", true);
      announce("没有可移动空间了");
    }

    render(state);
    log("move", { direction, score: state.score, gameOver: state.gameOver, won: state.won });
  }

  function createInitialState() {
    const next = {
      board: createEmptyBoard(),
      score: 0,
      bestScore: getBestScore(),
      won: false,
      gameOver: false,
      keepPlaying: false,
    };

    const withOne = spawnTile(next);
    return spawnTile(withOne);
  }

  function createEmptyBoard() {
    return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 0));
  }

  function spawnTile(currentState) {
    const empty = [];
    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        if (currentState.board[row][col] === 0) {
          empty.push({ row, col });
        }
      }
    }

    if (empty.length === 0) {
      return currentState;
    }

    const pick = empty[Math.floor(Math.random() * empty.length)];
    const value = Math.random() < NEW_TILE_FOUR_PROBABILITY ? 4 : 2;
    const board = cloneBoard(currentState.board);
    board[pick.row][pick.col] = value;

    return {
      ...currentState,
      board,
    };
  }

  function move(currentState, direction) {
    const board = cloneBoard(currentState.board);
    const transformed = transformBoardForDirection(board, direction);

    let scoreDelta = 0;
    let moved = false;

    const mergedRows = transformed.map((row) => {
      const { row: mergedRow, gained, changed } = mergeLine(row);
      scoreDelta += gained;
      moved = moved || changed;
      return mergedRow;
    });

    const restored = restoreBoardFromDirection(mergedRows, direction);

    return {
      board: restored,
      moved,
      scoreDelta,
    };
  }

  function mergeLine(line) {
    const compact = line.filter((v) => v !== 0);
    const result = [];
    let gained = 0;

    for (let i = 0; i < compact.length; i += 1) {
      const current = compact[i];
      const next = compact[i + 1];
      if (next !== undefined && current === next) {
        const merged = current * 2;
        result.push(merged);
        gained += merged;
        i += 1;
      } else {
        result.push(current);
      }
    }

    while (result.length < BOARD_SIZE) {
      result.push(0);
    }

    const changed = !arraysEqual(line, result);
    return { row: result, gained, changed };
  }

  function transformBoardForDirection(board, direction) {
    if (direction === Direction.LEFT) {
      return board;
    }

    if (direction === Direction.RIGHT) {
      return board.map((row) => [...row].reverse());
    }

    const transposed = transpose(board);

    if (direction === Direction.UP) {
      return transposed;
    }

    if (direction === Direction.DOWN) {
      return transposed.map((row) => [...row].reverse());
    }

    return board;
  }

  function restoreBoardFromDirection(board, direction) {
    if (direction === Direction.LEFT) {
      return board;
    }

    if (direction === Direction.RIGHT) {
      return board.map((row) => [...row].reverse());
    }

    if (direction === Direction.UP) {
      return transpose(board);
    }

    if (direction === Direction.DOWN) {
      return transpose(board.map((row) => [...row].reverse()));
    }

    return board;
  }

  function hasAvailableMoves(board) {
    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        const current = board[row][col];
        if (current === 0) {
          return true;
        }

        const right = col + 1 < BOARD_SIZE ? board[row][col + 1] : null;
        const down = row + 1 < BOARD_SIZE ? board[row + 1][col] : null;

        if (right === current || down === current) {
          return true;
        }
      }
    }
    return false;
  }

  function hasReachedTarget(board, target) {
    return board.some((row) => row.some((value) => value >= target));
  }

  function render(currentState) {
    dom.board.innerHTML = "";

    for (let row = 0; row < BOARD_SIZE; row += 1) {
      for (let col = 0; col < BOARD_SIZE; col += 1) {
        const value = currentState.board[row][col];
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.value = String(value);
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", value === 0 ? "empty" : String(value));
        cell.textContent = value === 0 ? "" : String(value);
        dom.board.appendChild(cell);
      }
    }

    dom.score.textContent = String(currentState.score);
    dom.bestScore.textContent = String(currentState.bestScore);

    if (currentState.gameOver) {
      showOverlay("游戏结束", true);
      dom.continueBtn.hidden = true;
    } else if (currentState.won && !currentState.keepPlaying) {
      showOverlay("恭喜！你达成了 2048", false);
      dom.continueBtn.hidden = false;
    } else {
      hideOverlay();
      dom.continueBtn.hidden = true;
    }
  }

  function showOverlay(text, gameOver) {
    dom.overlayText.textContent = text;
    dom.overlay.hidden = false;
    dom.overlay.dataset.gameOver = gameOver ? "1" : "0";
  }

  function hideOverlay() {
    dom.overlay.hidden = true;
  }

  function announce(text) {
    dom.message.textContent = text;
  }

  function getBestScore() {
    try {
      const raw = localStorage.getItem(BEST_SCORE_KEY);
      const parsed = Number(raw);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    } catch {
      return 0;
    }
  }

  function saveBestScore(score) {
    try {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
    } catch {
      log("localStorage unavailable", score);
    }
  }

  function getSwipeDirection(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD_PX && Math.abs(dy) < SWIPE_THRESHOLD_PX) {
      return null;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? Direction.RIGHT : Direction.LEFT;
    }

    return dy > 0 ? Direction.DOWN : Direction.UP;
  }

  function transpose(board) {
    return board[0].map((_, col) => board.map((row) => row[col]));
  }

  function cloneBoard(board) {
    return board.map((row) => [...row]);
  }

  function arraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  function log(...args) {
    if (DEBUG_GAME) {
      console.log("[2048]", ...args);
    }
  }
})();
