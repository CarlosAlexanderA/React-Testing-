export const WinnerModal = ({ winner, resetGame }) => {
  return (
    <div className="winner">
      <div className="text">
        <h2 className="win">
          <span>{winner === false ? 'empate' : 'gano'}</span>
          <span>{winner}</span>
        </h2>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo </button>
        </footer>
      </div>
    </div>
  );
};
