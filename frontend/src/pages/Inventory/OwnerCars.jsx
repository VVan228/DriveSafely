import React, {useContext, useEffect, useRef, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import {AuthContext} from "../../context";
import Loader from "../../components/UI/loader/Loader";
import Car, {
    addZerosToId,
    convertCarsToJsObject,
    getCarRarityColor, getCarRarityName,
    getDummyCars,
    getLevelUpCost
} from '../../utils/cars.js'
import {useFetching} from "../../hooks/useFetching";
import ContractService from "../../API/ContractService";
import {faker} from "@faker-js/faker";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import classes from "../Pages.module.css";
import ParameterBar from "../../components/ParameterBar";
import {ProgressBar} from 'primereact/progressbar';
import MyModal from "../../components/UI/modal/MyModal";
import {parse} from "@fortawesome/fontawesome-svg-core";
import {ethers} from "ethers";
import MyButton from "../../components/UI/button/MyButton";
import classes2 from "../../components/UI/cards/Card.module.css"
import EngineSelectCard from "../../components/UI/cards/EngineSelectCard";
import {convertEnginesToJsObject} from "../../utils/engines";
import {convertChassisToJsObject} from "../../utils/chassis";
import MyInput from "../../components/UI/input/MyInput";

const OwnerCars = () => {


    const {tokenContract} = useContext(AuthContext)
    const [currentCarIndex, setCurrentCarIndex] = useState(0)
    const [opacity, setOpacity] = useState(0)

    //СТЕЙТЫ МОДАЛОК
    const [showLevelUpModal, setShowLevelUpModal] = useState(false)
    const [showEngineChangeModal, setShowEngineChangeModal] = useState(false)
    const [showChassisChangeModal, setShowChassisChangeModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)

    const [cars, setCars] = useState([new Car("Tesla Silvia", 81231, 0, 0, 1, 187200, 10, 0)])
    const [engines, setEngines] = useState([])
    const [chassis, setChassis] = useState([])

    const useLogging = false

    const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            useLogging && alert(`Owner:\n${owner.toString()}`)
            let response = await tokenContract.getCarsByOwner(owner)
            useLogging && alert(`Got response:\n${response}`)
            await setCars(convertCarsToJsObject(response))
            // useLogging && alert(`OwnerCars state:\n${cars[currentCarIndex].toString()}`)
            return response;
        }
    )

    const [fetchEngines, isEnginesLoading, enginesError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getEnginesByOwner(owner)
            await setEngines(convertEnginesToJsObject(response))
            return response;
        }
    )

    const [fetchChassis, isChassisLoading, chassisError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getChassisByOwner(owner)
            await setChassis(convertChassisToJsObject(response))
            return response;
        }
    )


    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentCarIndex(index)
        }
    }

    useEffect(() => {
        setOpacity(0.0)
        setTimeout(() => {
            setOpacity(1)
        }, 300)
    }, [currentCarIndex])


    useEffect(() => {
        fetchCars()
        fetchEngines()
        fetchChassis()
    }, [])


    if (carsError) {
        return <h1>Произошла ошибка {carsError}</h1>
    } else if (!cars[currentCarIndex]) {
        console.log(`Waiting for cars to load from ${tokenContract.address.toString()}`)
        return <Loader/>
    } else if (cars.length == 0) {
        tokenContract.createCar(faker.vehicle.vehicle())
        tokenContract.createFuelStation()
    }
    return (
        isCarsLoading || isEnginesLoading || isChassisLoading
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
                        <div className="col-8 d-flex justify-content-center align-items-center">
                            <div className={"d-flex flex-column justify-content-center align-items-center"}
                                 style={{opacity: opacity}}>
                                <div
                                    className={[classes2.rarityLabel, "col-6"].join(" ")}
                                    style={{backgroundColor: getCarRarityColor(cars[currentCarIndex])}}
                                >{getCarRarityName(cars[currentCarIndex])}</div>
                                <div>
                                    <h2 className={[classes.bigText].join(" ")}>
                                        {isCarsLoading ? <ProgressBar/> : cars[currentCarIndex].model}
                                    </h2>
                                    <h4 className={[classes.textItalic, "text-muted"].join(" ")}>
                                        #{addZerosToId(cars[currentCarIndex].id, 8)}
                                    </h4>
                                </div>
                                <div
                                    className="mt-5"
                                >
                                    <img
                                        className={classes2.flyingImage}
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
                <MySidebar side="right" width="50%" align="center">
                    <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-between">
                        <div className={"h-100 w-100"}>
                            <ParameterBar
                                title="Уровень"
                                value={cars[currentCarIndex].level}
                                icon={<i className="pi pi-plus" style={{fontSize: "2em"}}></i>}
                                action={() => setShowLevelUpModal(true)}
                            />
                            <ParameterBar
                                title="Двигатель"
                                value={cars[currentCarIndex].engineId === "0" ? "Не установлен" : `#${cars[currentCarIndex].engineId}`}
                                icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}
                                modal={"engineSwap"}
                                action={() => setShowEngineChangeModal(true)}
                            />
                            <ParameterBar
                                title="Шасси"
                                value={cars[currentCarIndex].chassisId === "0" ? "Не установлено" : `#${cars[currentCarIndex].chassisId}`}
                                icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}
                                action={() => setShowChassisChangeModal(true)}
                            />
                            <ParameterBar title="Пробег" value={`${cars[currentCarIndex].mileage} км`}/>
                        </div>
                        <div>
                            <MyButton onClick={() => setShowSellModal(true)}>Продать</MyButton>
                        </div>
                    </div>
                </MySidebar>


                {/*АПГРЕЙД УРОВНЯ*/}
                <MyModal
                    isShowing={showLevelUpModal}
                    close={() => setShowLevelUpModal(false)}
                    title="PimpMyRide"
                    subTitle="Тачку на прокачку"
                    showConfirmButton={true}
                    confirmButtonText={`Прокачать за ${getLevelUpCost(cars[currentCarIndex].level)} ETH`}
                    confirmButtonAction={async () => {
                        let cost = ethers.utils.parseEther(`${getLevelUpCost(cars[currentCarIndex].level)}`)
                        console.log(cost)
                        tokenContract.levelUp(ethers.BigNumber.from(`${cars[currentCarIndex].id}`), {value: cost});
                    }}
                >
                    <div className="row justify-content-center align-items-center">
                        <div className="col-3 h2">{cars[currentCarIndex].level}</div>
                        <div className="col-3"><i className="pi pi-arrow-right" style={{fontSize: "2em"}}></i></div>
                        <div
                            className={[classes.yellowText, "col-3 h1"].join(" ")}>{parseInt(cars[currentCarIndex].level) + 1} </div>
                    </div>
                    <img
                        src={cars[currentCarIndex].image}
                        height={300}
                        style={{
                            filter: `hue-rotate(${cars[currentCarIndex].hue}deg)`,
                            transition: '.5s',
                            opacity: opacity,
                            transform: "rotate(90deg)"
                        }}
                        alt=""/>
                </MyModal>


                {/*ЗАМЕНА ДВИГАТЕЛЯ*/}
                <MyModal
                    isShowing={showEngineChangeModal}
                    close={() => setShowEngineChangeModal(false)}
                    title="Свап"
                    subTitle="Заменить двигатель"
                    showConfirmButton={true}
                    confirmButtonText={`Подтвердить`}
                    confirmButtonAction={async () => {
                        // let cost = ethers.utils.parseEther(`${getLevelUpCost(cars[currentCarIndex].level)}`)
                        // console.log(cost)
                        // tokenContract.levelUp(ethers.BigNumber.from(`${cars[currentCarIndex].id}`), {value: cost});
                    }}
                >
                    {/*ТЕЛО ЗАМЕНЫ ДВИГАТЕЛЯ*/}
                    <div className="row justify-content-center align-items-center">
                        <EngineSelectCard clickable={false} engine={engines[cars[currentCarIndex].engineId]}/>
                        <h3>На</h3>
                        {engines.map(engine =>
                            engine.id !== engines[cars[currentCarIndex].engineId] && <EngineSelectCard engine={engine}/>
                        )}
                    </div>
                </MyModal>

                {/*ЗАМЕНА ШАССИ*/}
                <MyModal
                    isShowing={showChassisChangeModal}
                    close={() => setShowChassisChangeModal(false)}
                    title="Свап"
                    subTitle="Заменить шасси"
                    showConfirmButton={true}
                    confirmButtonText={`Подтвердить`}
                    confirmButtonAction={async () => {
                        // let cost = ethers.utils.parseEther(`${getLevelUpCost(cars[currentCarIndex].level)}`)
                        // console.log(cost)
                        // tokenContract.levelUp(ethers.BigNumber.from(`${cars[currentCarIndex].id}`), {value: cost});
                    }}
                >
                    {/*ТЕЛО ЗАМЕНЫ ШАССИ*/}
                    <div className="row justify-content-center align-items-center">
                        <div className="col-3 h2">{cars[currentCarIndex].level}</div>
                        <div className="col-3"><i className="pi pi-arrow-right" style={{fontSize: "2em"}}></i></div>
                        <div
                            className={[classes.yellowText, "col-3 h1"].join(" ")}>{parseInt(cars[currentCarIndex].level) + 1} </div>
                    </div>
                    <img
                        src={cars[currentCarIndex].image}
                        height={300}
                        style={{
                            filter: `hue-rotate(${cars[currentCarIndex].hue}deg)`,
                            transition: '.5s',
                            opacity: opacity,
                            transform: "rotate(90deg)"
                        }}
                        alt=""/>
                </MyModal>

                {/*Продажа авто*/}
                <MyModal
                    isShowing={showSellModal}
                    close={() => setShowSellModal(false)}
                    title="Продать машину"
                    // subTitle="Заменить шасси"
                    showConfirmButton={true}
                    confirmButtonText={`Продать`}
                    confirmButtonAction={async () => {
                        // let cost = ethers.utils.parseEther(`${getLevelUpCost(cars[currentCarIndex].level)}`)
                        // console.log(cost)
                        // tokenContract.levelUp(ethers.BigNumber.from(`${cars[currentCarIndex].id}`), {value: cost});
                    }}
                >
                    {/*ТЕЛО продажи авто*/}
                    <div className="row justify-content-center align-items-center">
                        <div className="col-4"><MyInput placeholder={"Цена"}/></div>
                        <div className="col-1 h3 m-0 ms-3">ETH</div>
                    </div>
                    <img
                        src={cars[currentCarIndex].image}
                        height={300}
                        style={{
                            filter: `hue-rotate(${cars[currentCarIndex].hue}deg)`,
                            transition: '.5s',
                            opacity: opacity,
                            transform: "rotate(90deg)"
                        }}
                        alt=""/>
                </MyModal>


            </div>


    );
};

export default OwnerCars;