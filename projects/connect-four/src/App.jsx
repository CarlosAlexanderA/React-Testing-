import { useState } from 'react';
import { Circle } from './components/Circle';
import { TURNS } from './constants';
import { createBoard, checkWinner } from './logic/game';
import confetti from 'canvas-confetti';
import { WinnerModal } from './components/WinnerModal';
function App() {
  const [turn, setTurn] = useState(TURNS.player1);

  const connectFour = 'connectFour';
  const [board, setBoard] = useState(createBoard(6, 7));

  // null si no hay un ganador y false si es empate
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (winner) {
      return;
    }
    const column = parseInt(index[index.length - 1]);
    const newBoard = board.map((row) => [...row]);
    // Encuentra la fila donde debe ir el valor, comenzando desde el fondo
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (newBoard[i][column] === null) {
        newBoard[i][column] = turn; // Agrega el valor en esa celda
        setBoard(newBoard);
        break; // Sale del bucle una vez que se haya agregado el valor
      }
    }

    if (checkWinner(newBoard, turn)) {
      confetti();
      setWinner(turn === 'x' ? 'player 1' : 'player 2');
    }
    const newTurn = turn === 'x' ? TURNS.player2 : TURNS.player1;
    setTurn(newTurn);

    // console.log(newBoard);
  };
  const resetGame = () => {
    setBoard(createBoard(6, 7));
    setTurn(TURNS.player1);
    setWinner(null);
  };
  // useEffect(() => {
  //   // console.log('Winner is ' + winner);
  // }, [winner]);

  return (
    <main className={connectFour}>
      <section className={`${connectFour}-content`}>
        <div className={`${connectFour}-chart`}>
          {board.map((circle, indexRow) => {
            return circle.map((algo, indexColumn) => {
              const index = `${indexRow}_${indexColumn}`;
              // console.log(algo);
              return (
                <Circle
                  key={index}
                  index={index}
                  prevClass={connectFour}
                  updateBoard={updateBoard}
                >
                  {algo}
                </Circle>
              );
            });
          })}
        </div>
      </section>
      <section>
        {winner !== null && (
          <>
            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
