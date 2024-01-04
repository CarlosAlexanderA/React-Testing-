import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {FormInput, FormTextArea} from './components/Form';
import {Results} from './components/Results';
import {CommentWithId, getComments, postComment} from './service/comments';

function App() {
  const {data, isLoading, isError} = useQuery<CommentWithId>({
    queryKey: ['comments'],
    queryFn: getComments,
  });
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({queryKey: ['comments']});

      const prevComments = queryClient.getQueryData(['comments']);

      queryClient.setQueryData<Comment[]>(['comments'], (oldData) => {
        const newCommentToAdd = structuredClone(newComment);
        newCommentToAdd.preview = true;

        if (oldData == null) return [newCommentToAdd];

        return [...oldData, newCommentToAdd];
      });

      return {prevComments}; // ----> context
    },
    onError: (error, variables, context) => {
      console.error(error);
      if (context?.prevComments != null)
        queryClient.setQueryData(['comments'], context?.prevComments);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['comments']});
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isPending) return;

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = formData.get('message')?.toString() ?? '';
    const title = formData.get('title')?.toString() ?? '';

    if (title !== '' && message !== '') mutate({title, message});
  };

  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="col-span-1 bg-white p-8">
        {isLoading && <strong>Cargando...</strong>}
        {isError && <strong>Algo salio mal</strong>}
        <Results data={data} />
      </div>
      <div className="col-span-1 bg-gray-800 p-8">
        <form
          action="#"
          className={`${
            isPending ? 'opacity-20' : ''
          } max-w-xl m-auto block px-4`}
          onSubmit={handleSubmit}
        >
          <FormInput />
          <FormTextArea />

          <button
            disabled={isPending}
            type="submit"
            className="mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2"
          >
            {isPending ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
