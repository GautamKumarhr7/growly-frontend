import "./Button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {text}
    </button>
  );
}
