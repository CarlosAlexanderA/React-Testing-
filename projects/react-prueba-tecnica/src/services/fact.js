import { CAT_ENDPOINT_RANDOM_FACT, CAT_PREFIX_IMAGE_URL } from '../constants';
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
  const data = await res.json();
  const { fact } = data;
  return fact;
};
export const getRandomImage = async (words) => {
  try {
    const res = await fetch(`${CAT_PREFIX_IMAGE_URL}/says/${words}?json=true`);
    if (!res.ok) throw new Error('Error fetching fact');
    const response = await res.json();
    const { _id } = response;
    const newUrl = `${CAT_PREFIX_IMAGE_URL}/${_id}/says/${words}`;
    return newUrl;
  } catch (err) {
    // tanto si hay un error con la respuetas, como con la peticion
    console.log(err);
  }
};
