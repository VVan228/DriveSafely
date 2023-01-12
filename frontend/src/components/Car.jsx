import React, {useState} from 'react';
import classes from "../pages/Pages.module.css";



const Car = (props) => {
    return (
        <div {...props} style={{
            position: "absolute",
            index: props.index,
            transform: `rotate(${props.rotate}deg)`,
            bottom: `${props.position.y}%`,
            left: `${props.position.x}%`,
            width: props.width,
            height: props.height
        }
        }>
            <img src={props.car.image} alt=""/>
            {(props.order!=-1) ? <div className={classes.orderSprite} style={{transform: `rotate(${-props.rotate}deg)`}}>
                {props.order + 1}
            </div> : null}
            {/*<span className="h2 position-absolute top-50 left-50 bg-light">{props.rotate / 90}</span>*/}
        </div>
    );
};

export default Car;
