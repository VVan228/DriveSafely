import React, {useEffect, useState} from 'react';
import classes from "../pages/Pages.module.css";


const Car = (props) => {


    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        // console.log(props.direction)
    }, [])

    return (
        <div {...props}
             className={"d-flex justify-content-center align-items-center"}
             style={{
                 position: "absolute",
                 index: props.index,
                 transform: `rotate(${props.rotate}deg)`,
                 bottom: `${props.position.y}%`,
                 left: `${props.position.x}%`,
                 width: props.width,
                 height: props.height,
             }
             }>

            <img src={props.car.image} style={{width: "100%", filter: `hue-rotate(${props.car.hue}deg)`}} alt=""/>
            {props.direction == "2" && <div
                className={classes.turnLights}
                style={
                    //    правый поворот
                    props.direction == "1" ?
                        {alignItems: "flex-end"} :
                        //левый поворот
                        {alignItems: "flex-start"}
                }
            >
                <div className={classes.turnLight}></div>
                <div className={classes.turnLight}></div>
            </div>}
            {
                (props.order != -1) ?
                    <div className={classes.orderSprite} style={{transform: `rotate(${-props.rotate}deg)`}}>
                        {props.order + 1}
                    </div> :
                    null
            }
            {/*<span className="h2 position-absolute top-50 left-50 bg-light">{props.rotate / 90}</span>*/}
        </div>
    );
};

export default Car;
