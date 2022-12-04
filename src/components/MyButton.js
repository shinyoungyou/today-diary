// Custom Button Component 
const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    // create and return a new string by concatenating
    // all of the elements in this array, separated by space(" ")
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// If you do not pass type props, default is passed.
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
