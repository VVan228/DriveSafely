import React, {useEffect, useState} from 'react';
import {getBarWidth, getTime} from "../utils/factory";
import classes from "./Components.module.css";

const FactoryFullnessBar = (props) => {


    const [time, setTime] = useState()

    useEffect(()=> {
        setInterval(()=>{

        }, 1000)
    })

    return (
        <div className="d-flex align-items-center justify-content-center text-center flex-column w-100">
            <div>
                <h2 className={"text-muted"}>{props.factory.currentFullness} / {props.factory.capacity}</h2>
            </div>

            <div
                className={classes.fullnessBarContainer}
            >
                <div
                    className={
                    props.factory.currentFullness !== props.factory.capacity ?
                        classes.fullnessBarValueBlinking :
                    classes.fullnessBarValue
                }
                    style={{
                        width: `${getBarWidth(props.factory)}%`,
                        backgroundColor: props.color
                    }}
                >
                </div>
            </div>
            <div>
                <h6 className={"text-muted mt-2 text-center"}>{getTime(props.factory)}</h6>
            </div>
        </div>
    );
};

export default FactoryFullnessBar;