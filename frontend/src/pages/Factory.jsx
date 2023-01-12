import React, {useContext, useEffect, useState} from 'react';
import MySidebar from "../components/UI/sidebar/MySidebar";
import ContractService from "../API/ContractService";
import {AuthContext} from "../context";
import Navbar from "../components/UI/navbar/Navbar";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {convertFactoryToJsObject} from "../utils/factory";
import ErrorDialog from "../components/ErrorDialog";
import FactoryFullnessBar from "../components/FactoryFullnessBar";
import ParameterBar from "../components/ParameterBar";
import MyModal from "../components/UI/modal/MyModal";
import MyInput from "../components/UI/input/MyInput";
import {ethers} from "ethers";
import classes2 from "../components/UI/cards/Card.module.css"

const Factory = () => {

    const {tokenContract} = useContext(AuthContext)
    const [factory, setFactory] = useState({})
    const [showCapacityModal, setShowCapacityModal] = useState(false)
    const [showSpeedModal, setShowSpeedModal] = useState(false)

    const [capacityUpgradeValue, setCapacityUpgradeValue] = useState(0)
    const [speedUpgradeValue, setSpeedUpgradeValue] = useState(0)


    const [fetchFactory, isFactoryLoading, factoryError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getFuelStationByOwner(owner)
            console.log(response)
            setFactory(convertFactoryToJsObject(response))
            return response;
        }
    )

    useEffect(() => {
        fetchFactory()
    }, [])

    if (factoryError) {
        return <ErrorDialog message={factoryError}/>
    }

    return (
        isFactoryLoading ? <Loader/> :
            <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
                <Navbar/>
                <MySidebar side="left" color="#fff" width="60%" className="d-flex align-items-center">
                    <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100 text-dark">
                        <div>
                            <img className={classes2.flyingImage} src={factory.image} alt="" height={400}/>
                        </div>
                        <div className={"col-5 d-flex justify-content-center mt-3"}>
                            <FactoryFullnessBar factory={factory} color={"#ECA553"}/>
                        </div>
                        {/*{factory.toString()}*/}
                    </div>
                </MySidebar>
                <MySidebar side="right" width="40%">
                    <div className="w-100 d-flex flex-column align-items-center">
                        <ParameterBar
                            title={"Вместимость"}
                            value={`${factory.capacity} л`}
                            icon={<i className="pi pi-plus" style={{fontSize: "2em"}}></i>}
                            action={() => setShowCapacityModal(true)}
                        />
                        <ParameterBar
                            title={"Скорость производства"}
                            value={`${factory.productionPerHour} л/ч`}
                            icon={<i className="pi pi-plus" style={{fontSize: "2em"}}></i>}
                            action={() => setShowSpeedModal(true)}
                        />
                    </div>
                </MySidebar>

                {/*АПГРЕЙД ВМЕСТИМОСТИ*/}
                <MyModal
                    isShowing={showCapacityModal}
                    close={() => setShowCapacityModal(false)}
                    title="Прокачка"
                    subTitle="Увеличить вместимость фабрики"
                    showConfirmButton={true}
                    confirmButtonText={`Прокачать`}
                    confirmButtonAction={async () => {
                        if (parseInt(capacityUpgradeValue) > 0) {
                            console.log(capacityUpgradeValue)
                            let cost = await tokenContract.getCapacityUpgradeCost(factory.id, capacityUpgradeValue)
                            console.log(cost)
                            tokenContract.upgradeCapacity(ethers.BigNumber.from(`${factory.id}`), capacityUpgradeValue, {value: cost})
                        } else {
                            alert("Введите значение для апгрейда")
                        }
                    }}>
                    {/*СОДЕРЖИМОЕ МОДАЛКИ*/}
                    <div className="row justify-content-center align-items-center">
                        <div className="col-2 h2">{factory.capacity} л</div>
                        <div className="col-2"><i className="pi pi-arrow-right" style={{fontSize: "2em"}}></i></div>
                        <div className={"col-3 d-flex h2 align-items-center m-0"}>
                            <div className={"col-9 me-2"}>
                                <MyInput placeholder={"???"}
                                         onChange={(e) => setCapacityUpgradeValue(e.target.value - factory.capacity)}/>
                            </div>
                            <div className={"col-3"}>
                                л
                            </div>
                        </div>
                    </div>
                    <div className={"m-5"}><img
                        src={factory.image}
                        height={300}
                        style={{filter: `hue-rotate(${factory.hue}deg)`,}}
                        alt=""/></div>
                </MyModal>


                {/*АПГРЕЙД СКОРОСТИ*/}
                <MyModal
                    isShowing={showSpeedModal}
                    close={() => setShowSpeedModal(false)}
                    title="Прокачка"
                    subTitle="Увеличить скорости работы фабрики"
                    showConfirmButton={true}
                    confirmButtonText={`Прокачать`}
                    confirmButtonAction={async () => {
                        if (parseInt(speedUpgradeValue) > 0) {
                            console.log(capacityUpgradeValue)
                            let cost = await tokenContract.getProductionPerHourUpgradeCost(factory.id, speedUpgradeValue)
                            console.log(cost)
                            tokenContract.upgradeProductionPerHour(ethers.BigNumber.from(`${factory.id}`), speedUpgradeValue, {value: cost})
                        } else {
                            alert("Введите значение для апгрейда")
                        }
                    }}>
                    {/*СОДЕРЖИМОЕ МОДАЛКИ*/}
                    <div className="row justify-content-center align-items-center">
                        <div className="col-2 h2">{factory.productionPerHour} л/ч</div>
                        <div className="col-2"><i className="pi pi-arrow-right" style={{fontSize: "2em"}}></i></div>
                        <div className={"col-3 d-flex h2 align-items-center m-0"}>
                            <div className={"col-9 me-2"}>
                                <MyInput placeholder={"???"}
                                         onChange={(e) => setSpeedUpgradeValue(e.target.value - factory.productionPerHour)}/>
                            </div>
                            <div className={"col-auto ms-2"}>
                                л/ч
                            </div>
                        </div>
                    </div>
                    <div className={"m-5"}><img
                        src={factory.image}
                        height={300}
                        style={{filter: `hue-rotate(${factory.hue}deg)`,}}
                        alt=""/></div>
                </MyModal>

            </div>


    );
};

export default Factory;