export const TwitterFollowCard = ({
  formatUserName,
  userName,
  name,
  isFollow,
}) => {
  return (
    <article className="tw-follwCard">
      <header className="tw-follwCard-header">
        <img
          className="tw-follwCard-avatar"
          src={`https://unavatar.io/${userName}`}
          alt="avatar de perfil"
        />
        <div className="tw-follwCard-info">
          <strong>{name}</strong>
          <span>{formatUserName(userName)}</span>
        </div>
      </header>
      <aside>
        <button className="tw-follwCard-button">Seguir</button>
      </aside>
    </article>
  );
};
