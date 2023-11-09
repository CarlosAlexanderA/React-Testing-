import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // se ejecuta 2 veces por los efectos y ayuda a asaber si el codigo esta bien
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
