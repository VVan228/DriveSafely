import React, {useEffect, useLayoutEffect, useState} from 'react';
import classes from "./Pages.module.css";
import background from "../images/game/background.png"
import background2 from "../images/game/background2.png"
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {useParams} from "react-router-dom";
import {getDummyCars} from "../utils/cars";
import Car from "../components/Car";
import {getCarPosition} from "../utils/race";
import {getRoomInfo} from "../utils/room";

const Race = () => {

    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)
    const params = useParams()

    const roomInfo = getRoomInfo("113344112211121314231");
    const roadType = Math.floor(Math.random() * 2)
    const testCars = getDummyCars(Math.floor(Math.random() * ((roadType === 0 ? 5 : 4) - 2) + 2))
    const testCarsComponents = roomInfo.listOfCars.map((car, index)=>
        <Car
            key={car.index}
            car={testCars[0]}
            position={car.position}
            width="5%"
            height="8%"
            rotate={car.rotation}
        />
    )
    console.log(testCarsComponents)


    const [waitForPlayers, isRoomLoading, error] = useFetching(async () => {
        setTimeout(() => {
            console.log("loaded")
        }, 5000)
    })

    useEffect(() => {
        waitForPlayers()
        console.log(testCars)
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
                    <div className="position-absolute top-0 text-dark bg-light">
                        <h1 className="">Машин: {testCars.length}</h1>
                        {testCarsComponents.map(car =>
                            <h3 className="">{car.props.rotate / 90}: ({car.props.position.x}%,{car.props.position.y}%)</h3>
                        )}
                    </div>

                    {/*<img src={roadType == 0 ? background : background2 } alt="" width="100%" style={{}}/>*/}
                    {/*{testCarsComponents.map(testCar => testCar)}*/}

                    <div style={{backgroundImage:  `url(${background})`, backgroundSize: "cover",
                    backgroundPosition: "center", width: "100%", paddingTop:"80%", position: "relative"}}>
                        {testCarsComponents.map(testCar => testCar)}
                    </div>
                </div>
            </div>
    );
};

export default Race;
