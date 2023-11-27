import { Link } from '../Link'

export default function page404() {
  return (
    <>
      <div>
        <h1>This NOT fine</h1>
        <img
          src="https://media1.giphy.com/media/NTur7XlVDUdqM/giphy.gif?cid=ecf05e47xe5r9k4qnv7p9aj128958n8nh209op2w90wra740&rid=giphy.gif"
          alt="perro tomando cafe en llamas"
        />
      </div>
      <Link to="/">Volver a la Home </Link>
    </>
  )
}
