export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  try {
    const res = await fetch(
      `https://randomuser.me/api?results=10&seed=CarlosAcero&page=${pageParam}`
    )

    if (!res.ok) {
      throw new Error('Error en la petición')
    }

    const data = await res.json()
    const currentPage = Number(data.info.page)
    const nextCursor = currentPage > 3 ? undefined : currentPage + 1

    // console.log(data)
    return {
      users: data.results,
      nextCursor,
    }
  } catch (error) {
    throw new Error('Error en la petición')
  }
}
