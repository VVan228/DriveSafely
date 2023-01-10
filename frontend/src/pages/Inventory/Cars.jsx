import React, {useContext, useEffect, useRef, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import {AuthContext} from "../../context";
import Loader from "../../components/UI/loader/Loader";
import Car, {addZerosToId, convertCarsToJsObject, getDummyCars, getLevelUpCost} from '../../utils/cars.js'
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


const Cars = () => {

    const {contract, isLoading} = useContext(AuthContext)
    const [currentCarIndex, setCurrentCarIndex] = useState(0)
    const [opacity, setOpacity] = useState(0)
    const [modalToOpen, setModalToOpen] = useState("levelUp")
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
                    <div className="w-100 d-flex flex-column align-items-center">
                        <ParameterBar
                            title="Уровень"
                            value={cars[currentCarIndex].level}
                            icon={<i className="pi pi-plus" style={{fontSize: "2em"}}></i>}
                            modal={"levelUp"}
                        />
                        <ParameterBar
                            title="Двигатель"
                            value={cars[currentCarIndex].engineId === "0" ? "Не установлен" : `#${cars[currentCarIndex].engineId}`}
                            icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}
                            modal={"engineSwap"}
                        />

                        <ParameterBar
                            title="Шасси"
                            value={cars[currentCarIndex].chassisId === "0" ? "Не установлено" : `#${cars[currentCarIndex].chassisId}`}
                            icon={<i className="pi pi-arrow-right-arrow-left" style={{fontSize: "2em"}}></i>}
                            modal={"chasisSwap"}
                        />
                        <ParameterBar title="Пробег" value={`${cars[currentCarIndex].mileage} км`}/>
                    </div>
                </MySidebar>


                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">*/}
                {/*     Запустите демо модального окна*/}
                {/*</button>*/}

                <MyModal
                    title="Прокачка уровня"
                    modalId="levelUp"
                    showConfirmButton={true}
                    confirmButtonText={`Прокачать за ${getLevelUpCost(cars[currentCarIndex].level).toFixed(4)} ETH`}
                    confirmButtonAction={async () => {
                        contract.levelUp(ethers.BigNumber.from(`${cars[currentCarIndex].id}`),{value: ethers.utils.parseEther(`${getLevelUpCost(cars[currentCarIndex].level)}`)});
                    }}
                >
                    <div className="row justify-content-center align-items-center">
                        <div className="col-1 h2">{cars[currentCarIndex].level}</div>
                        <div className="col-1"><i className="pi pi-arrow-right" style={{fontSize: "2em"}}></i></div>
                        <div
                            className={[classes.yellowText, "col-1 h1"].join(" ")}>{parseInt(cars[currentCarIndex].level) + 1} </div>
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
                <MyModal title="Заменить двигатель" modalId="engineSwap">двигатель</MyModal>
                <MyModal title="Заменить шасси" modalId="chasisSwap">шасси</MyModal>


            </div>
    );
};

export default Cars;