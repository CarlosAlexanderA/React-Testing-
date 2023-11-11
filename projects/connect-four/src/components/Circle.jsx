export const Circle = ({ children, index, prevClass, updateBoard }) => {
  const className = `${prevClass}-btnCircle ${
    children === 'x' ? 'green' : children === 'o' ? 'red' : ''
  }`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <button id={index} className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
