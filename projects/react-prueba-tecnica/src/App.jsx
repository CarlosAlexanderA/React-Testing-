import { useEffect, useState } from 'react';
import './App.css';
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat';
export default function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);
  // para recuperar la imagen cada vez que tenemos una cita
  useEffect(() => {
    if (!fact) return;
    const threeWords = fact.split(' ', 3).join(' ');

    fetch(`${CAT_PREFIX_IMAGE_URL}/says/${threeWords}?json=true`)
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching fact');
        return res.json();
      })
      .then((response) => {
        const { _id } = response;
        const newUrl = `${CAT_PREFIX_IMAGE_URL}/${_id}/says/${threeWords}`;
        setImageUrl(newUrl);
      })
      .catch((err) => {
        // tanto si hay un error con la respuetas, como con la peticion
        console.log(err);
      });
  }, [fact]);
  return (
    <main>
      <h1>App de gatos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img src={imageUrl} alt={`Image from api, of a cat sayin any word`} />
        )}
      </section>
    </main>
  );
}
