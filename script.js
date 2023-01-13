const Game = function () {
  let curPlayer = "X";
  let board = new Board();

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winConditions.length; i++) {
      if (
        board.get(winConditions[i][0]) == curPlayer &&
        board.get(winConditions[i][1]) == curPlayer &&
        board.get(winConditions[i][2]) == curPlayer
      ) {
        board = new Board();
        alert(curPlayer + " wins!");
        curPlayer = "X";
        return true;
      }
    }

    curPlayer = curPlayer == "X" ? "O" : "X";
    return false;
  };

  const move = (index) => {
    if (board.set(index, curPlayer)) {
      checkWin();
    }
  };

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
    console.log(player);
    if (board[index] == 0) {
      board[index] = player;
      document.getElementById("" + index).innerText = player;
      return true;
    }

    return false;
  };

  const get = (index) => {
    return board[index];
  };

  resetBoard();

  return { set, resetBoard, get };
};

document.getElementById("newGame").addEventListener("click", () => {
  let game = new Game();

  for (let i = 0; i < 9; i++) {
    document
      .getElementById("" + i)
      .addEventListener("click", () => game.move(i));
  }
});
