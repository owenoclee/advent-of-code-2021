import { Handler } from "../handler.ts";

type Board = {
  rowCount: number;
  columnCount: number;
  numbersInRow: number[][];
  uncrossedNumbersInRow: number[];
  numbersInColumn: number[][];
  uncrossedNumbersInColumn: number[];
  allNumbers: number[];
};

const parseBoard = (boardLines: string[]) => {
  const boardRows = boardLines
    .map((row) =>
      row
        .split(" ")
        .filter((cell) => cell.length > 0)
        .map((n) => Number(n))
    );

  const numbersInColumn = [...boardRows[0]].map(() => []) as number[][];
  boardRows.forEach((row) =>
    row.forEach((n, col) => numbersInColumn[col].push(n))
  );

  return {
    rowCount: boardRows.length,
    columnCount: boardRows[0].length,
    numbersInRow: boardRows,
    uncrossedNumbersInRow: boardRows.map((row) => row.length),
    numbersInColumn,
    uncrossedNumbersInColumn: numbersInColumn.map((col) => col.length),
    allNumbers: boardRows.flat(),
  };
};

const findWinningBoard = (numbersToDraw: number[], boards: Board[]) => {
  const drawnNumbers: number[] = [];
  for (const number of numbersToDraw) {
    drawnNumbers.push(number);
    for (const board of boards) {
      for (let row = 0; row < board.rowCount; row++) {
        if (board.numbersInRow[row].includes(number)) {
          board.uncrossedNumbersInRow[row]--;
          if (board.uncrossedNumbersInRow[row] === 0) {
            return { winningNumber: number, winningBoard: board, drawnNumbers };
          }
        }
      }
      for (let col = 0; col < board.columnCount; col++) {
        if (board.numbersInColumn[col].includes(number)) {
          board.uncrossedNumbersInColumn[col]--;
          if (board.uncrossedNumbersInColumn[col] === 0) {
            return { winningNumber: number, winningBoard: board, drawnNumbers };
          }
        }
      }
    }
  }
  throw new Error("Could not find winning board");
};

export const day04: Handler = (lines, part) => {
  const numbersToDraw = lines.shift()!.split(",").map((n) => Number(n));

  const _boards: string[][] = [];
  lines.forEach((line) => {
    if (line.trim() === "") {
      _boards.push([]);
      return;
    }
    _boards[_boards.length - 1].push(line);
  });
  const boards = _boards.filter((b) => b.length > 0);

  const parsedBoards = boards.map((board) => parseBoard(board));

  const { winningNumber, winningBoard, drawnNumbers } = findWinningBoard(
    numbersToDraw,
    parsedBoards,
  );

  const uncrossedNumbersSum = winningBoard.allNumbers
    .filter((n) => !drawnNumbers.includes(n))
    .reduce((sum, n) => sum + n);

  return winningNumber * uncrossedNumbersSum;
};
