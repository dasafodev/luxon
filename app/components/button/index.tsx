import React from 'react';
import styles from './button.module.css';

const Button = ({ children, secondary = false, buttonClass = '', customeStyle = null, onClick = null }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${secondary && styles.secondary} ${buttonClass} ${customeStyle} `}
    >
      {children}
    </button>
  );
};

export default Button;
