import { useRef, useState } from 'react';
import './App.css';
import { getActiveToken } from './utils/getActiveToken';
import { useSearchBox } from 'react-instantsearch-hooks';

function App() {
  const InputRef = useRef(); // con '.current' entras a la etiqueta como getElementById
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const { refine } = useSearchBox();
  const handleInput = () => {
    // valor y posicion del cursor del texto
    const { value, selectionEnd = 0 } = InputRef.current;
    const { word } = getActiveToken(value, selectionEnd);
    const shouldOpenAutoComplete = /^@\w{1,15}$/.test(word); // -> capturar si se abre la modal o no
    setShowAutoComplete(shouldOpenAutoComplete);
    shouldOpenAutoComplete && refine(word.slice(1));
  };
  return (
    <main className="container">
      <section className="box">
        <div className="box-body">
          <aside className="box-avatar">
            <img src="https://unavatar.io/twitter/midudev" alt="midudev" />
          </aside>

          <div className="box-compose">
            <form>
              <textarea
                placeholder="¿Qué está pasando?"
                className="box-textbox"
                // onKeyUp={() => {}}
                onClick={handleInput}
                ref={InputRef}
              />
            </form>
            {showAutoComplete && (
              <div className="autocomplete-panel">Showin auto complete</div>
            )}
          </div>
        </div>

        <footer className="box-footer">
          <button type="submit" className="tweet-button">
            Twittear
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
