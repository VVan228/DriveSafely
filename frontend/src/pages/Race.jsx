import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import classes from "./Pages.module.css";
import background1 from "../images/game/background.png"
import background2 from "../images/game/background2.png"
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {convertCarsToJsObject, getDummyCars} from "../utils/cars";
import Car from "../components/Car";
import {getCarPosition} from "../utils/race";
import {getRoomInfo} from "../utils/room";
import {AuthContext} from "../context";
import ContractService from "../API/ContractService";
import Sign from "../components/Sign";
import MyButton from "../components/UI/button/MyButton";

const Race = () => {

    const {roomDNA, roomID} = useParams()
    const [order, setOrder] = useState([])
    const {tokenContract} = useContext(AuthContext)
    const navigate = useNavigate()

    function onClickCar(index){
        console.log("++++", order, "++++")
        let newOrder = order
        console.log(newOrder)
        if(!newOrder.includes(index)){
            newOrder.push(index)
            setOrder(newOrder)
            let newCars = []

            cars.map((car, index) =>
                newCars.push(
                    <Car
                        index={car.props.index}
                        order={newOrder.indexOf(car.props.index)}
                        car={testCars[index]}
                        position={car.props.position}
                        width="5%"
                        height="8%"
                        rotate={car.props.rotate}
                        onClick={()=>onClickCar(car.props.index)}
                    />
                )
            )
            setCars(newCars)
            console.log(newOrder)
        }
    }

    function onClickClear(){
        let newCars = []
        cars.map((car) =>
            newCars.push(
                <Car
                    index={car.props.index}
                    order={-1}
                    car={testCars[0]}
                    position={car.props.position}
                    width="5%"
                    height="8%"
                    rotate={car.props.rotate}
                    onClick={()=>onClickCar(car.props.index)}
                />
            )
        )
        setCars(newCars)
        setOrder([])
    }

    const verifyAnswer = () => {
        tokenContract.on("RoomClosed", (roomId) => {
            let roomInfo = {
                roomId: roomId,
            };
            console.log(roomInfo.roomDNA, roomInfo.roomId)
            // navigate(`/race/${roomInfo.roomDNA}/${roomInfo.roomId}`)
        });
        console.log("order: ", typeof order, order)
        tokenContract.commitAnswer(roomID, order)
        navigate(`/raceResults/${roomID}`)
    }

    const roomInfo = getRoomInfo(roomDNA);
    const testCars = getDummyCars(roomInfo.listOfCars.length)
    const testCarsComponents = roomInfo.listOfCars.map((car, index)=>
        <Car
            index={car.index}
            car={testCars[index]}
            order={-1}
            position={car.position}
            width="5%"
            height="8%"
            rotate={car.rotation}
            onClick={()=>onClickCar(car.index)}
        />
    )
    const signs = roomInfo.mainSignIndicator.map((sign, index)=>
        <Sign
            isMain={sign.isMain}
            position={sign.position}
            width="5%"
            height="5%"
            rotate={sign.rotation}
        />
    )
    const [cars, setCars] = useState(testCarsComponents)
    console.log(testCarsComponents)


    return (
            <div className={classes.raceBackground}>
                <div style={{width: "100vw"}}>
                    <div className="position-absolute top-0 text-dark bg-light">
                        <h1 className="">Машин: {testCars.length}</h1>
                        {testCarsComponents.map(car =>
                            <h3 className="">{car.props.rotate / 90}: ({car.props.position.x}%,{car.props.position.y}%)</h3>
                        )}
                    </div>

                    <div style={{backgroundImage:  getRoomInfo(roomDNA) !== 0 ? `url(${background1})` : `url(${background2})`, backgroundSize: "cover",
                        backgroundPosition: "center", width: "100%", paddingTop:"80%", position: "relative"}}>
                        {cars.map(testCar => testCar)}
                        {signs.map(testCar => testCar)}
                    </div>

                    <div className={classes.bottomRaceContainer}>
                        <div>
                            <MyButton
                                onClick={() => {

                                    onClickClear()
                                }
                                }
                                color={"secondary"}>Сброс</MyButton>
                        </div>

                        <div>
                            <MyButton color={"success"} onClick={() => verifyAnswer()}>Drive Safely!</MyButton>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Race;