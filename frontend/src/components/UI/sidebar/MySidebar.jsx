import React from 'react';
import classes from "./MySidebar.module.css";

const MySidebar = ({children, ...props}) => {
    return (
        <div {...props} className={[props.side === "left" ? classes.leftSidebar : classes.rightSidebar, classes.mySidebar].join(" ")}>
            {children}
        </div>
    );
};

export default MySidebar;