// reusable component
import React from "react";

const Button = ({
  onClick,
  children,
  className = "btn btn-primary",
  type = "button",
}) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;
