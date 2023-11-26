import { Link } from '../Link'

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Estas es una pagina de inicio</p>
      <Link to="/about">Ir a sobre nosotros</Link>
    </>
  )
}
