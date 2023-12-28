import { SortBy, User } from '../type.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (uuid: string) => void
  showColors: boolean
  users: User[]
}
export function UsersList({
  changeSorting,
  deleteUser,
  showColors,
  users,
}: Props) {
  console.log(users)

  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
            Appelido
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : ''}>
        {users.map(user => {
          return (
            <tr key={user.login.uuid}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.title} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.login.uuid)}>
                  Borrar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
