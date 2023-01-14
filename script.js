// X == Human, O == AI

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const Game = function () {
  let curPlayer = "X";
  let board = new Board();

  const checkWin = () => {
    for (let i = 0; i < winConditions.length; i++) {
      if (
        board.get(winConditions[i][0]) == curPlayer &&
        board.get(winConditions[i][1]) == curPlayer &&
        board.get(winConditions[i][2]) == curPlayer
      ) {
        overlay(curPlayer == "X" ? "You won!" : "You lost!");
        return true;
      }
    }

    if (board.isFull()) {
      overlay("You tied!");
      return true;
    }
    curPlayer = curPlayer == "X" ? "O" : "X";
    return false;
  };

  const overlay = (text) => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');

    h1.innerText = text;
    div.classList = 'overlay fadeIn';
    div.appendChild(h1);

    div.addEventListener("click", () => {
      board = new Board();
      curPlayer = "X";
      div.classList = 'overlay fadeOut';
      setTimeout(() => document.body.removeChild(div), 300);
    })

    document.body.appendChild(div);
  }

  const move = (index) => {
    if (board.set(index, curPlayer)) {
      if (!checkWin()) {
        aiMove();
      }
    }
  };

  const winCheck = (arr, player) => {
    for (let i = 0; i < winConditions.length; i++) {
      if (arr[winConditions[i][0]] == player && arr[winConditions[i][1]] == player && arr[winConditions[i][2]] == player) {
        return true;
      }
    }

    return false;
  }

  const aiMove = () => {
    // let index;
    // do {
    //   index = Math.floor(Math.random() * 9);
    // } while (board.get(index) != 0);

    let scoreArr = Array(9);
    let testArr = Array(9);

    for (let i = 0; i < 9; i++) {
      if (board.get(i) == 0) {
        scoreArr[i] = 0;
      } else {
        scoreArr[i] = null;
      }
      testArr[i] = board.get(i);
    }

    for (let i = 0; i < 9; i++) {
      if (scoreArr[i] != null) {
        let tmp = [...testArr];
        tmp[i] = "O";
        scoreArr[i] = aiHelper(tmp, "X");
      }
    }

    let maxIndex = 0;

    for (let i = 0; i < 9; i++) {
      if (scoreArr[i] != null) {
        if (scoreArr[maxIndex] == null) {
          maxIndex = i;
        } else if (scoreArr[maxIndex] < scoreArr[i]) {
          maxIndex = i;
        }
      }
    }

    board.set(maxIndex, curPlayer);
    checkWin();
  };

  const aiHelper = (testArr, player) => {
    if (winCheck(testArr, player)) {
      if (player == "X") {
        return -1;
      } else {
        return 1;
      }
    } else if (testArr.indexOf(0) == -1) {
      return 0;
    } else {
      let result = 0;
      for (let i = 0; i < 9; i++) {
        if (testArr[i] == 0) {
          const tmp = [...testArr];
          tmp[i] = player;
          result += aiHelper(tmp, player == "X" ? "O" : "X");
        }
      }
      return result;
    }
  }

  return { move };
};

const Board = function () {
  const board = Array(9).fill(0);
  const resetBoard = () => {
    board.fill(0);
    for (let i = 0; i < 9; i++) {
      document.getElementById("" + i).innerText = "";
    }
  };

  const set = (index, player) => {
    let moved = false;
    if (board[index] == 0) {
      board[index] = player;
      document.getElementById("" + index).innerText = player;
      moved = true;
    }
    return moved;
  };

  const get = (index) => {
    return board[index];
  };

  const isFull = () => {
    return board.indexOf(0) == -1;
  };

  resetBoard();

  return { set, resetBoard, get, isFull };
};

window.onload = () => {
  const game = new Game();

  for (let i = 0; i < 9; i++) {
    document
      .getElementById("" + i)
      .addEventListener("click", () => game.move(i));
  }
};
