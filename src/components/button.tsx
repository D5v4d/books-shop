import React from 'react';
import { ButtonProps } from '../types/button';

const Button: React.FC<ButtonProps> = ({ className, text, mt, ml, onClick }) => {
  const style: React.CSSProperties = {};

  if (mt) style.marginTop = mt;
  if (ml) style.marginLeft = ml;

  return (
    <button onClick={onClick} className={className || ''} style={style}>
      {text}
    </button>
  );
};

export default Button;