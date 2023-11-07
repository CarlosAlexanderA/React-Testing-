import { WINNER_COMBOS } from '../constants';

export const checkWinner = (boardToCheck) => {
  // revisamos las combinaciones ganadaroas, para ver si 'x' u 'o' ganan
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && // 0 -> x || o
      boardToCheck[a] === boardToCheck[b] && // a = b -> si x = x || o = o
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // es 'x' || 'o'
    }
  }
  // si no hay ganador}
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
