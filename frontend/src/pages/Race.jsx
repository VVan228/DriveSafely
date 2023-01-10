import React, {useEffect, useLayoutEffect, useState} from 'react';
import classes from "./Pages.module.css";
import background from "../images/game/background.png"
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";

const Race = () => {

    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)


    const [waitForPlayers, isRoomLoading, error] = useFetching(async () => {
        setTimeout(() => {
            console.log("loaded")
        }, 5000)
    })

    useEffect(() => {
        waitForPlayers()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        });
    }, [])

    // window.onresize(console.log("resized to", window.innerWidth, window.innerHeight))

    return (
        isRoomLoading ?
            <div className="h-100 w-100 d-flex align-items-center justify-content-center"><Loader/></div> :
            <div className={classes.raceBackground}>
                <div style={{width: "100vw"}}>
                    <img src={background} alt="" width="100%" style={{}}/>
                    <div className={classes.testDot} style={{
                        transition: ".3s",
                        top: `${windowWidth / windowHeight / (windowWidth / windowHeight) * 70 }%`,
                        left: '54%',
                    }}></div>
                </div>
            </div>
    );
};

export default Race;