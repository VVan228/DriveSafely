import React from 'react';
import classes from "../pages/Pages.module.css";

const WorldPreview = ({...props}) => {
    return (
        <div {...props}>
            <h3 className="text-center mb-5">Мир {props.level}</h3>
            <img className={classes.worldImageContainer} src={props.src}></img>
        </div>
    );
};

export default WorldPreview;