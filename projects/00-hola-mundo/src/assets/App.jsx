// importatar css de app
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

// creando un componente
export const App = () => {
  const format = (userName) => `@${userName}`; // podermos pasar funciones
  // const formateddName = <span>@midudev</span> // podemos pasar elelmento tambien
  return (
    // remplaza a React.Fragment '<>'
    <section className="App">
      <TwitterFollowCard
        formatUserName={format}
        userName="midudev"
        name="Miguel Angel Durán"
        isFollow
      />
      <TwitterFollowCard
        formatUserName={format}
        userName="pjerald"
        name="Pablo Hérnandez"
        isFollow={false}
      />
    </section>
  );
};
