import { useEffect, useState } from 'react';
import { getRandomFact } from '../services/fact';
export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((res) => setFact(res));
  };

  useEffect(refreshFact, []);
  return { fact, refreshFact };
}
