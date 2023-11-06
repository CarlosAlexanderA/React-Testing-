// hooks, para darle mas funcionalidad a react 'utilities'
import { useState } from 'react';
// todas las props que se inician solo se cambian con este component, ya no por el padre
export const TwitterFollowCard = ({
  children,
  formatUserName,
  userName,
  name,
  initialIsFollowing,
}) => {
  // const state = useState(false) ; // deveulve un array de 2
  // const isFollowing = state[0] // estado en el que se encuentra
  // const setIsFollwing = state[1] // para cambiar el estado

  const [isFollowing, setIsFollwing] = useState(initialIsFollowing); // forma corta

  const handleClick = () => {
    setIsFollwing(!isFollowing);
  };
  // cambiamos el estado de nuestro componente
  const text = isFollowing ? 'Siguiendo' : 'Seguir';
  // las clases segun nuestro estado
  const buttonClassName = isFollowing
    ? 'tw-follwCard-button is-following'
    : 'tw-follwCard-button';

  return (
    <article className="tw-follwCard">
      <header className="tw-follwCard-header">
        <img
          className="tw-follwCard-avatar"
          src={`https://unavatar.io/${userName}`}
          alt="avatar de perfil"
        />
        <div className="tw-follwCard-info">
          <strong>{children === undefined ? name : children}</strong>
          <span>{formatUserName(userName)}</span>
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="tw-follwCard-text">{text}</span>
          <span className="tw-follwCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
};
