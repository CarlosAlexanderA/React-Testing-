// importatar css de app
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
// import { useState } from 'react';

// creando un componente
export const App = () => {
  const format = (userName) => `@${userName}`; // podermos pasar funciones
  // const formateddName = <span>@midudev</span> // podemos pasar elelmento tambien
  // const pherald = {
  //   // mala practica <- puede no llegar a entenderse
  //   userName: 'pherald',
  //   formatUserName: format,
  //   initialIsFollowing: false,
  // }; // se puede pasar objetos
  // // propagaciond e cambios
  // const [name, setName] = useState('midudev'); // permite actualizar todos los datos del componente
  // const [isFollowing, setIsFollowing] = useState(true);
  // console.log('initial following', isFollowing);

  const users = [
    {
      userName: 'midudev',
      name: 'miguel algel duran',
      isFollowing: true,
      formatUserName: format,
    },
    {
      userName: 'pherald',
      name: 'PabloH.',
      isFollowing: false,
      formatUserName: format,
    },
    {
      userName: 'PacoHdezs',
      name: 'Paco Hdez',
      isFollowing: true,
      formatUserName: format,
    },
    {
      userName: 'TNChein',
      name: 'Tomas',
      isFollowing: false,
      formatUserName: format,
    },
  ];

  return (
    // remplaza a React.Fragment '<>'
    // todos los valores con los que se inician, ya no se actualizan por el padre, solo por el componente mismo
    <section className="App">
      {/* initialIsFollowing => solo se usa la primera vez y el padre no puede cambiar el valor, solo el componenete  */}
      {/* <TwitterFollowCard
        formatUserName={format}
        userName={name}
        name="Miguel Angel Durán"
        initialIsFollowing={isFollowing}
      >
        <h1>Migel Angel Duran</h1>
      </TwitterFollowCard> */}

      {/* <TwitterFollowCard {...pherald}>Pablo Hernandez</TwitterFollowCard> */}

      {/* <button onClick={() => setName('pedroMichel')}> Cambio nombre </button>
      <button onClick={() => setIsFollowing(!isFollowing)}>
        Cambio de estado
      </button> */}

      {users.map((user) => {
        const { userName, name, isFollowing, formatUserName } = user;
        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
            formatUserName={formatUserName}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
};
