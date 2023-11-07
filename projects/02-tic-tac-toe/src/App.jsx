import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
const TURNS = { X: 'x', O: 'o' };

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
// se puede optimizar
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  /// null si es que no hay un ganador y false si es un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
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
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const updateBoard = (index) => {
    // no actuazliza esta posicion si ya tiene algo
    if (board[index] || winner) return;
    const newBoard = [...board]; // las props y estados son inmutables
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === 'x' ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner); // esto es asincrono
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>
      <section>
        {winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>{winner === false ? 'Empate' : 'Ganó'}</h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
