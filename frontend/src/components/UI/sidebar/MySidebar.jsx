import React, {useEffect, useRef, useState} from 'react';
import classes from "./MySidebar.module.css";

const MySidebar = ({children, ...props}) => {

    const sidebar = useRef(null)
    const [position, setPosition] = useState("-100%")

    useEffect(() => {
        setPosition("0%")
    }, [window.location])

    return (
        <div
            {...props}
            ref={sidebar}
            className={[props.side === "left" ? classes.leftSidebar : classes.rightSidebar, classes.mySidebar, "d-flex align-items-center", `justify-content-${props.align}`].join(" ")}
            style={props.side === "left" ? {
                left: position,
                backgroundColor: props.color,
                width: props.width
            } : {right: position, backgroundColor: props.color, width: props.width}}

        >
            {children}
        </div>
    );
};

export default MySidebar;