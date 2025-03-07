import React from 'react';
import styles from './button.module.css';

// eslint-disable-next-line react/display-name
export const Button = React.memo(({ onClick, disabled, text }) => {    
    return (
        <button onClick={onClick} disabled={disabled} className={styles.button}>
            {text}
        </button>
    );
});