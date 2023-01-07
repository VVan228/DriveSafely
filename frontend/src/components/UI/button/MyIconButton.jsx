import React from 'react';
import classes from './MyButton.module.css';

const MyIconButton = ({children, ...props}) => {
    return (
        <button
            {...props}
            className={[classes.myIconBtn, props.className].join(' ')}
            style={{
                color: props.color
            }}
        >
            <p>{children}</p>
        </button>
    );
};

export default MyIconButton;