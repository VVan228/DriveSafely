import React, {useContext, useEffect, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import {AuthContext} from "../../context";
import Loader from "../../components/UI/loader/Loader";
import Car, {convertCarsToJsObject, getDummyCars} from '../../utils/cars.js'
import {useFetching} from "../../hooks/useFetching";
import ContractService from "../../API/ContractService";
import {faker} from "@faker-js/faker";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import classes from "../Pages.module.css";
import ParameterBar from "../../components/ParameterBar";
import { ProgressBar } from 'primereact/progressbar';


const Cars = ({...props}) => {

    const {contract, isLoading} = useContext(AuthContext)
    const [currentCarIndex, setCurrentCarIndex] = useState(0)
    const [currentCar, setCurrentCar] = useState(0)
    const [opacity, setOpacity] = useState(0)
    const [cars, setCars] = useState([new Car("Tesla Silvia", 81231, 0, 0, 1, 187200, 10, 0)])

    const useLogging = false

    const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            useLogging && alert(`Owner:\n${owner.toString()}`)
            let response = await contract.getCarsByOwner(owner)
            useLogging && alert(`Got response:\n${response}`)
            await setCars(await convertCarsToJsObject(response))
            useLogging && alert(`Cars state:\n${cars[currentCarIndex].toString()}`)
            return response;
        }
    )


    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentCarIndex(index)
        }
    }



    useEffect(() => {
        setCurrentCar(cars[currentCarIndex])
        setOpacity(0.0)
        setTimeout(() => {
            setOpacity(1)
        }, 300)
    }, [currentCarIndex])

    useEffect(() => {
        fetchCars()
        // setTimeout(()=>{setItemPosition("0%")},100)
    }, [])

    if (carsError) {
        return <h1>Произошла ошибка {carsError}</h1>
    } else if (!cars[currentCarIndex]) {

        console.log(`Waiting for cars to load from ${contract.address.toString()}`)
        return <Loader/>
    }
        return (
            isCarsLoading
            ? <Loader/>
            : <div className="row flex-nowrap align-items-center w-100 h-100">
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
                                            <h2 className={[classes.bigText, classes.textItalic].join(" ")}>
                                                {isCarsLoading ? <ProgressBar/> : cars[currentCarIndex].model}
                                            </h2>
                                            <h4 className="text-muted">
                                                #{cars[currentCarIndex].id}
                                            </h4>
                                        </div>
                                        <div
                                            className="mt-5"
                                        >
                                            <img
                                                src={cars[currentCarIndex].image}
                                                height={500}
                                                style={{
                                                    filter: `hue-rotate(${cars[currentCarIndex].hue}deg)`,
                                                    transition: '.5s',
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
                        <ParameterBar title="Двигатель" value={`Engine #${currentCar.engineId}`} icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}/>
                        <ParameterBar title="Шасси" value={`Chassis #${currentCar.chassisId}`} icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}/>
                        <ParameterBar title="Пробег" value={`${currentCar.mileage} км`}/>

                    </div>
                </MySidebar>
            </div>
        );
};

export default Cars;