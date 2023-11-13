import { useEffect, useState } from 'react';
import { getRandomImage } from '../services/fact';
export function useCatImage({ fact }) {
  // custom hook => recupera la url de la imagen

  const [imageUrl, setImageUrl] = useState();
  // para recuperar la imagen cada vez que tenemos una cita
  useEffect(() => {
    if (!fact) return;
    const threeWords = fact.split(' ', 3).join(' ');
    (async () => {
      const newImage = await getRandomImage(threeWords);
      setImageUrl(newImage);
    })();
  }, [fact]);
  return { imageUrl };
}
