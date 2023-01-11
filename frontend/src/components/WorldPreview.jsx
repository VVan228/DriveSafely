import React from 'react';
import classes from "../pages/Pages.module.css";
import MyButton from "./UI/button/MyButton";

const WorldPreview = ({...props}) => {
    return (
        <div {...props}>

            <div className={classes.worldImageContainer}>
                <img
                    src={props.src}
                    style={{filter: `hue-rotate(${props.hueRotate}deg)`}}
                ></img>
            </div>
            <h3 className="text-center text-light mt-5 font-weight-bold">Мир #{props.level}</h3>
            {/*<div className="w-100 d-flex justify-content-center mt-3">*/}
            {/*    <MyButton>Поехали</MyButton>*/}
            {/*</div>*/}
        </div>
    );
};

export default WorldPreview;