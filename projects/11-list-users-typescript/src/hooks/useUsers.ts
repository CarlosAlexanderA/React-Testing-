import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/user'
import { User } from '../type.d'

export function useUsers() {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      users: User[]
      nextCursor?: number
    }>({
      queryKey: ['users'],
      queryFn: fetchUsers, // <- Ninguna sobrecarga coincide con esta llamada, no se cual sea el error aqui
      getNextPageParam: lastPage => lastPage.nextCursor,
      refetchOnWindowFocus: false, //<-no actualiza los datos cada vez
      staleTime: 1000 * 3, //<- actualiza los datos viejos
      // retry: false, // *intenta hacer de nuevo la llamada a la api
    })

  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap(page => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  }
}
