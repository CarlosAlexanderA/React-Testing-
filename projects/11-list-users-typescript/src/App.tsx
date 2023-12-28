import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './type.d'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  // ? userRef -> guarda el valor que queremos que se comparta entre renderizados
  // * pero que al cambiar no vuevla a renderizar el componente
  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }
  const handleReset = () => {
    setUsers(originalUsers.current)
  }
  const handleDelete = (uuid: string) => {
    const updatedUsers = users.filter(user => user.login.uuid !== uuid)

    setUsers(updatedUsers)
  }
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => {
        console.error(err)
      })
    // console.log(users)
  }, [])

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

  // * otra opcion es usar el spread opereator, ya que hace un clone a primer nivel
  // * [...users].sort
  // ? sort con spread operator tiene un 7 :star
  const sortedUser = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filterCountry])

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por pais'
            : 'Ordenar por pais'}
        </button>
        <button onClick={handleReset}>Restaurar los usuarios</button>
        <input
          type="text"
          placeholder="Busca por pais"
          onChange={e => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUser}
        />
      </main>
    </div>
  )
}

export default App
