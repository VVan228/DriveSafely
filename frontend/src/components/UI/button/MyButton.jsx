import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        props.shadow ?
            <button {...props} className={[classes.myBtn, props.className].join(' ')}
                    style={{
                        color: props.textColor,
                        backgroundColor: props.backgroundColor}}>
                <p>{children}</p>
            </button> :
            <button {...props} className={[classes.myBtn, props.className].join(' ')}
                    style={{color: props.textColor, backgroundColor: props.backgroundColor}}>
                <p>{children}</p>
            </button>
    );
};

export default MyButton;