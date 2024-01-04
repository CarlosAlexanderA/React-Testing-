import {CommentWithId} from '../service/comments';

export function Results({data}: {data?: CommentWithId[]}) {
  return (
    <ul>
      {data?.map((comment) => (
        <li key={comment.id}>
          <article
            className={`${
              comment?.preview === true ? 'bg-gray-300' : 'bg-white'
            } block max-w-sm p-6  border border-gray-200 rounded-lg shadow hover:bg-gray-100`}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {comment.title}
            </h5>
            <p className="font-normal text-gray-700"> {comment.message}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
