import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={[
            props.color == "secondary" ? classes.mySecondaryButton :
                props.color == "warning" ? classes.myWarningButton :
                    props.color == "success" ? classes.mySuccessButton :
                    classes.myBtn, classes.myBtn,
            props.className].join(' ')}>
            <p>{children}</p>
        </button>

    );
};

export default MyButton;