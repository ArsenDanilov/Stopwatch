import { memo } from 'react';
import styles from "./button.module.css";

// eslint-disable-next-line react/display-name, react/prop-types
export const Button = memo(({ onClick, disabled, text }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {text}
    </button>
  );
});
