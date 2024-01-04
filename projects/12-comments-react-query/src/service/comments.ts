export interface Comment {
  title: string;
  message: string;
}

export interface CommentWithId extends Comment {
  id: string;
}
const API_KEY = import.meta.env.VITE_API_KEY_JSON_BIN;
const API_URL = 'https://api.jsonbin.io/v3/b/6595d7691f5677401f17260d';
export const getComments = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': API_KEY,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch comments.');

  const json = await response.json();
  return json?.record;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const postComment = async (comment: Comment) => {
  // await delay(1000);
  // throw new Error('no implemented yet.');
  const comments = await getComments();

  const id = crypto.randomUUID();
  const newComment = {...comment, id};
  const commentsToSave = [...comments, newComment];

  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': API_KEY,
    },
    body: JSON.stringify(commentsToSave),
  });

  if (!response.ok) throw new Error('Failed to post comment.');

  return newComment;
};
