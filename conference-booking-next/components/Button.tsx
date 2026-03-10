type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
};

function Button({ label, onClick, type = "button", style }: ButtonProps) {
  return (
    <button
      className="btn"
      onClick={onClick}
      type={type}
      style={style}
    >
      {label}
    </button>
  );
}

export default Button;