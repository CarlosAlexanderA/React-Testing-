import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './type'
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])

  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const toggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results)
      })
  }, [])
  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>Ordenar por Pais</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  )
}

export default App
