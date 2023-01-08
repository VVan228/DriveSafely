import React, {useEffect, useRef, useState} from 'react';
import classes from "./MySidebar.module.css";

const MySidebar = ({children, ...props}) => {

    const sidebar = useRef(null)
    const [position, setPosition] = useState("-100%")

    useEffect(()=>{
        setTimeout(()=> {
            setPosition("0%")
            }, 10)
    }, [] )

    return (
        <div
            {...props}
            ref={sidebar}
            className={[props.side === "left" ? classes.leftSidebar : classes.rightSidebar, classes.mySidebar, "d-flex align-items-center"].join(" ")}
            style={ props.side ===  "left" ? {left: position} : {right: position}}

        >
            {children}
        </div>
    );
};

export default MySidebar;