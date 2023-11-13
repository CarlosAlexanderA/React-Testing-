import './App.css';
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
export default function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });
  // para recuperar la cita al cargar la pagina

  const handleClick = async () => {
    refreshFact();
  };
  return (
    <main>
      <h1>App de gatos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img src={imageUrl} alt={`Image from api, of a cat sayin any word`} />
        )}
      </section>
      <button onClick={handleClick}>Generate New</button>
    </main>
  );
}
