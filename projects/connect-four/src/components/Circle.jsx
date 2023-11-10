export const Circle = ({ children, index, prevClass, updateBoard }) => {
  const className = `${prevClass}-btnCircle `;
  const handleClick = () => {
    console.log(index);
    updateBoard(index);
  };
  return (
    <button id={index} className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
