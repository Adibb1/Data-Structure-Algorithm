// Connect Four: Who Won? : https://www.codewars.com/kata/529962509ce9545c76000afa

// Time : O(n * m) Space : O(k) BAD
function connectFour(board) {
  let winner = [];
  let moveAvailable = false;

  //check per row/col
  for (i = 0; i < board.length; i++) {
    //check per column in 'i' row
    for (j = 0; j < board[i].length; j++) {
      let row = i;
      let col = j;
      if (board[row][col] !== "-") {
        let color = board[row][col];
        //check from, top -> top right -> right -> bottom right. no need to check bottom -> bottom left -> left -> top left because its already checked

        //top -1 row
        if (
          row > 2 &&
          color === board[row - 1][col] &&
          color === board[row - 2][col] &&
          color === board[row - 3][col]
        ) {
          //streak top
          winner.push(color);
        }

        //top right -1 row +1 col
        if (
          row > 2 &&
          col < board[row].length - 3 &&
          color === board[row - 1][col + 1] &&
          color === board[row - 2][col + 2] &&
          color === board[row - 3][col + 3]
        ) {
          //streak top right
          winner.push(color);
        }

        //right +1 col
        if (
          col < board[row].length - 3 &&
          color === board[row][col + 1] &&
          color === board[row][col + 2] &&
          color === board[row][col + 3]
        ) {
          //streak right
          winner.push(color);
        }

        //bottom right +1 row +1 col
        if (
          row < board.length - 3 &&
          col < board[row].length - 3 &&
          color === board[row + 1][col + 1] &&
          color === board[row + 2][col + 2] &&
          color === board[row + 3][col + 3]
        ) {
          //streak bottom right
          winner.push(color);
        }
      }
      //check if there are available move
      if (board[row][col] === "-") moveAvailable = true;
    }
  }

  //determine win or draw
  if (winner.length > 0) {
    //there are winners
    return winner;
  } else {
    //no one winning
    if (!moveAvailable) {
      //but there is no move available
      return "draw -no move available";
    } else {
      //but there are moves available
      return "in progress";
    }
  }
}

// Time : O(n * m) Space : O(1) BEST
function connectFour(board) {
  let rows = board.length;
  let cols = board[0].length;
  let directions = [
    [-1, 0], //up
    [-1, 1], //up right
    [0, 1], //right
    [1, 1], //bottom right
  ];
  let moveAvailable = false;

  function checkWin(row, col, color) {
    for (let [y, x] of directions) {
      let count = 1; //total streaks in that direction
      for (let i = 1; i < 4; i++) {
        let newRow = row + i * y;
        let newCol = col + i * x;
        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          board[newRow][newCol] !== color
        ) {
          //check if this go outside board
          break;
        }
        count++;
      }
      if (count === 4) return true;
    }
    return false;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let currentColor = board[row][col];

      if (currentColor === "-") {
        moveAvailable = true;
      } else {
        if (checkWin(row, col, currentColor)) {
          return currentColor; // return the winner as soon as found
        }
      }
    }
  }

  return moveAvailable ? "in progress" : "draw -no move available";
}

console.log(
  connectFour([
    ["-", "-", "-", "-", "Y", "Y", "Y"],
    ["-", "-", "-", "Y", "R", "Y", "Y"],
    ["-", "-", "-", "R", "R", "R", "R"],
    ["-", "Y", "R", "R", "R", "Y", "Y"],
    ["-", "-", "-", "Y", "R", "Y", "R"],
    ["-", "-", "Y", "R", "Y", "R", "Y"],
  ])
);
console.log(
  connectFour([
    ["R", "Y", "R", "Y", "R", "Y", "R"],
    ["R", "Y", "R", "Y", "R", "Y", "Y"],
    ["Y", "R", "Y", "Y", "Y", "R", "Y"],
    ["R", "Y", "Y", "R", "R", "R", "Y"],
    ["R", "R", "Y", "Y", "R", "Y", "R"],
    ["Y", "Y", "R", "R", "Y", "R", "R"],
  ])
);
