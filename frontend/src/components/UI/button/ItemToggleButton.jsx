import React from 'react';
import classes from "./MyButton.module.css";

const ItemToggleButton = (props) => {
    return (
        <button {...props}
            className={classes.itemToggleButton}
        >
            {<i className={['pi pi-angle-',props.side].join("")}/>}
        </button>
    );
};

export default ItemToggleButton;