const Game = function () {
  const board = Array(9).fill(0);
  let curPlayer = "X";

  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = 0;
      const curIndex = document.getElementById("" + i);
      curIndex.innerText = "";
      curIndex.addEventListener("click", () => changeBoard(i));
    }
    console.log(board);
  };

  const changeBoard = async (index) => {
    if (board[index] == 0) {
      board[index] = curPlayer;
      document.getElementById("" + index).innerText = curPlayer;
      if (checkWin()) {
        resetBoard();
        curPlayer = "X";
      } else {
        curPlayer = curPlayer == "X" ? "O" : "X";
      }
    }

    console.log(board);
  };

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
        board[[winConditions[i][0]]] == curPlayer &&
        board[[winConditions[i][1]]] == curPlayer &&
        board[[winConditions[i][2]]] == curPlayer
      ) {
        alert(curPlayer + " wins!");
        return true;
      }
    }
    console.log(board);
    return false;
  };

  resetBoard();

  return { changeBoard };
};

document.getElementById("newGame").addEventListener("click", () => new Game());
