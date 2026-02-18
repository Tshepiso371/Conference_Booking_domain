function Button({ label, onClick,type="button" }) {
  return (
    <button className="btn" onClick={onClick} 
    type={type}>
      {label}
    </button>
  );
}

export default Button;