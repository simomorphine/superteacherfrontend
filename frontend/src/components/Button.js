import React from 'react';

function Button({ label, onClick, variant = 'primary', ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
