import React, {useContext, useEffect, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import {AuthContext} from "../../context";
import Loader from "../../components/UI/loader/Loader";
import Car, {convertCarsToJsObject} from '../../utils/cars.js'
import {useFetching} from "../../hooks/useFetching";
import ContractService from "../../API/ContractService";
import {faker} from "@faker-js/faker";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import classes from "../Pages.module.css";
import ParameterBar from "../../components/ParameterBar";


const Cars = ({...props}) => {

    const {contract, isLoading} = useContext(AuthContext)
    const [currentCarIndex, setCurrentCarIndex] = useState(0)
    const [currentCar, setCurrentCar] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [cars, setCars] = useState([new Car("Tesla Silvia", 1221221, 0, 0, 1, 187200, 10, 0)])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function camelCase(string) {
        let camelCased = []
        string = string;
        let stringArray = string.toLowerCase().split(" ");
        stringArray.forEach(word => {
            camelCased.push(capitalizeFirstLetter(word))
        })
        return camelCased.join(" ")
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            // const response = await contract.getCarsByOwner(owner)
            // setCars(convertCarsToJsObject(response))
            const response = getDummyCars(100)
            setCars(response)
        }
    )

    const getDummyCars = (length) => {
        let dummyCars = []
        for (let i = 0; i < length; i++) {
            dummyCars.push(new Car(
                camelCase(faker.vehicle.vehicle().toLowerCase().split("").reverse().join("")),
                `${getRandomInt(100000000, 999999999)}`,
                getRandomInt(0, 900),
                getRandomInt(0, 900),
                getRandomInt(1, 100),
                getRandomInt(0, 90),
                getRandomInt(0, 90))
            )
        }
        return dummyCars
    }

    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentCarIndex(index)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [])

    useEffect(() => {
        setCurrentCar(cars[currentCarIndex])
        setOpacity(0.5)
        setTimeout(() => {
            setOpacity(1)
        }, 100)
    }, [currentCarIndex])

    if (isCarsLoading) {
        console.log(`Waiting for cars to load from ${contract.address.toString()}`)
        return <Loader/>
    } else {
        return (
            <div className="row flex-nowrap align-items-center w-100 h-100">
                <div className="col w-100">
                    <div className="row w-100 m-0 align-items-center justify-content-center">
                        <div className="col-2">
                            <ItemToggleButton
                                style={{
                                    visibility: currentCarIndex !== 0 ? "visible" : "hidden"
                                }}
                                onClick={() => {
                                    toggleItem(cars, currentCarIndex - 1);
                                }}>
                                <i className="pi pi-angle-left" style={{fontSize: "2em"}}></i>
                            </ItemToggleButton>
                        </div>
                        <div className="col-8 d-flex justify-content-center">
                            <div style={{opacity: opacity}}>
                                <div>
                                    <h2 className={classes.bigText}>
                                        {cars[currentCarIndex].model}
                                    </h2>
                                    <h4 className="text-muted">
                                        #{cars[currentCarIndex].vin}
                                    </h4>
                                </div>
                                <div className="mt-5">
                                    <img
                                        src={cars[currentCarIndex].image}
                                        height={500}
                                        style={{
                                            filter: `hue-rotate(${cars[currentCarIndex].hue}deg)`,
                                            transition: '.3s',
                                            opacity: opacity
                                        }}
                                        alt=""/>
                                </div>
                                <div className="mt-5">
                                    <h2 className="text-muted">
                                        {currentCarIndex + 1}/{cars.length}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                            <ItemToggleButton
                                style={{
                                    visibility: currentCarIndex !== cars.length - 1 ? "visible" : "hidden"
                                }}
                                onClick={() => {
                                    toggleItem(cars, currentCarIndex + 1);
                                }}>
                                <i className="pi pi-angle-right" style={{fontSize: "2em"}}></i>
                            </ItemToggleButton>
                        </div>
                    </div>
                </div>
                <MySidebar side="right" width="50%" align="center" >
                    <div className="w-100 d-flex flex-column align-items-center">
                        {/*Уровень*/}
                        <ParameterBar title="Уровень" value={currentCar.level} icon={<i className="pi pi-plus" style={{fontSize: "2em"}}></i>}/>
                        <ParameterBar title="Пробег" value={currentCar.mileage}/>
                        <ParameterBar title="Двигатель" value={`Engine #${currentCar.engineId}`} icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}/>
                        <ParameterBar title="Шасси" value={`Chassis #${currentCar.chassisId}`} icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}/>

                    </div>
                </MySidebar>
            </div>
        );
    }
};

export default Cars;