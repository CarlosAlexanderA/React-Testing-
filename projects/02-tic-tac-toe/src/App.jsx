import { useState } from 'react';
// import './App.css';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameToStorage, resetGameStorage } from './logic/storage';
function App() {
  // no puede ir en un if,
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    // '??' <- eso se usa para usar un valor respando en caso sea nulo
    return turnFromStorage ?? TURNS.X;
  });

  /// null si es que no hay un ganador y false si es un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  const updateBoard = (index) => {
    // no actuazliza esta posicion si ya tiene algo
    if (board[index] || winner) return;
    const newBoard = [...board]; // las props y estados son inmutables
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === '×' ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({ board: newBoard, turn: newTurn });
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti(); // => tira confeti
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
        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </section>
    </main>
  );
}

export default App;
