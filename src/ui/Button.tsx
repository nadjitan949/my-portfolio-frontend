import type { ReactNode, CSSProperties } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: CSSProperties; // <-- ajout de style
};

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  style, // <-- récupère le style
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} cursor-pointer ${className}`}
      style={style} // <-- applique le style directement
    >
      {children}
    </button>
  );
}

export default Button;
