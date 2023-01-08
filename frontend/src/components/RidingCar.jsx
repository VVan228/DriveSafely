import React, {useEffect, useState} from 'react';
import {Image} from 'primereact/image';

const RidingCar = (props) => {

    const [position, setPosition] = useState(-400)
    const [transition, setTransition] = useState("10s")

    useEffect(() => {
        //повторяется действие каждые 5 секунд
        setInterval(async () => {
            await new Promise(r => setTimeout(r, Math.random() * 3000));
            setTransition("10s")
            setPosition(10000)
            await new Promise(r => setTimeout(r, 3000));
            setTransition("0s")
            setPosition(-400)
        }, 5000)
    }, [])


    return (
        <img
            height="350"
            style={{
                zIndex: "100",
                transition: transition,
                position: "absolute",
                right: props.right,
                bottom: position
            }}
            src={props.src} alt="car"/>
    );
};

export default RidingCar;