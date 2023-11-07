import { Square } from './Square';
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  const winnerText = winner && <Square>{winner}</Square>;
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? 'Empate' : 'Ganó'}</h2>
        <header className="win">{winnerText}</header>
        <footer>
          <button onClick={resetGame}>empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
