import React from 'react';
import classes from "./MyButton.module.css";

const ItemToggleButton = (props) => {
    return (
        <button {...props}
            className={classes.itemToggleButton}
        >
        </button>
    );
};

export default ItemToggleButton;