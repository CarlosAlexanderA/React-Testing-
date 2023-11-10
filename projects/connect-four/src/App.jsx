import { useState } from 'react';
import { Circle } from './components/Circle';
import { TURNS } from './constants';
function App() {
  const [turn, setTurn] = useState(TURNS.player1);

  const createBoard = (rows, columns) => {
    const myArray = Array(rows).fill(Array(columns).fill(null));
    return myArray;
  };
  const connectFour = 'connectFour';
  const [board, setBoard] = useState(createBoard(6, 7));

  const updateBoard = (index) => {
    const [_, column] = index.split('_').map((num) => parseInt(num));

    // for (let i = 0; i < 7; i++) {
    //   if (board[5][i] === null) {
    //     console.log(board);
    //   }
    // }
    const newBoard = board.map((row) => [...row]);
    console.log(newBoard);
    // Encuentra la fila donde debe ir el valor, comenzando desde el fondo
    for (let i = newBoard.length - 1; i >= 0; i--) {
      if (newBoard[i][column] === null) {
        newBoard[i][column] = turn; // Agrega el valor en esa celda
        setBoard(newBoard);
        break; // Sale del bucle una vez que se haya agregado el valor
      }
    }
    if (checkWinner(newBoard, turn)) {
      console.log('Winner is ' + turn);
    }
    const newTurn = turn === 'x' ? TURNS.player2 : TURNS.player1;
    setTurn(newTurn);

    // console.log(newBoard);
  };

  // para un tablero de 6 x 7
  const checkWinner = (board, player) => {
    // Verificar horizontal
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Verificar vertical
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          return true;
        }
      }
    }

    // Verificar diagonal hacia arriba
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row - 1][col + 1] === player &&
          board[row - 2][col + 2] === player &&
          board[row - 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    // Verificar diagonal hacia abajo
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          return true;
        }
      }
    }

    return false;
  };

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
    </main>
  );
}

export default App;
