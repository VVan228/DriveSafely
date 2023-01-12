import React, {useState} from 'react';
import classes from "../pages/Pages.module.css";
import mainSign from "../images/game/main.png"
import noMainSign from "../images/game/noMain.png"

const Sign = (props) => {
    return (
        <div {...props} style={{
            position: "absolute",
            transform: `rotate(${props.rotate}deg)`,
            bottom: `${props.position.y}%`,
            left: `${props.position.x}%`,
            width: props.width,
            height: props.height
        }
        }>
            <img src={props.isMain? mainSign : noMainSign} width="100%" alt=""/>
            </div>


    );
};

export default Sign;
