import { useEffect, useState } from 'react';

const FollowMouse = () => {
  const [enable, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // no puede ir dentro ed un if o bucle, solo en el componente
  useEffect(() => {
    console.log('efecto', { enable });
    const handleClick = (event) => {
      const { clientX, clientY } = event;
      console.log('handleMove', { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enable) {
      window.addEventListener('pointermove', handleClick);
    }
    // getEventListener() -> para ver los eventos que tiene un objeto

    // limipiamos los eventos de elemento winodw y asi no no llenamos de eventos inncesarios
    // clean up
    // -> cuando el componente se desmonta
    // -> cuando cambian las depencias, antes de ejecutar
    //    el efecto de neuvo

    return () => {
      console.log('cleanup');
      window.removeEventListener('pointermove', handleClick);
    };
  }, [enable]);
  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [ebabled, ...] -> se ejecuta cuando cambia enabale o cualquier dependecia y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componete
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enable);

    return () => {
      document.body.classList.remove('no-cursor');
    };
  }, [enable]);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Togle mounted FollowMouse component
      </button>
    </main>
  );
}

export default App;
