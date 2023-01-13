import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import Navbar from "../components/UI/navbar/Navbar";
import CarsFilter from "../components/CarsFilter";
import MySidebar from "../components/UI/sidebar/MySidebar";
import {AuthContext} from "../context";
import ContractService from "../API/ContractService";
import {addZerosToId, convertCarToJsObject, getCarRarityColor, getCarRarityName, getLevelUpCost} from "../utils/cars";
import ParameterBar from "../components/ParameterBar";
import {ethers} from "ethers";
import classes from "../components/UI/cards/Card.module.css";
import {ProgressBar} from "primereact/progressbar";

const CarPage = () => {

    const params = useParams()
    const [car, setCar] = useState({})
    const [price, setPrice] = useState(0)
    const {tokenContract, carContract} = useContext(AuthContext)

    const [fetchCarById, isCarLoading, carError] = useFetching(async () => {
            let response = await tokenContract.cars(params.id)
            await setCar(await convertCarToJsObject(response))
            return response;
        }
    )

    const [fetchCarPriceById, isCarPriceLoading, carPriceError] = useFetching(async () => {
            let priceResponse = await carContract.carToPrice(params.id)
            console.log(typeof priceResponse)
            await setPrice(parseFloat(priceResponse) * Math.pow(10, -18))
            return priceResponse;
        }
    )

    useEffect(
        () => {
            fetchCarById()
            fetchCarPriceById()
        }, []
    )

    if (carError) {
        return <h6>Произошла ошибка {carError}</h6>
    } else if (!car) {
        console.log(`Waiting for cars to load from ${carContract.address.toString()}`)
        return <Loader/>
    }
    return (
        isCarLoading || isCarPriceLoading ? <Loader/> :
        <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
            <Navbar/>
            <div className="col d-flex justify-content-center align-items-center flex-column">
                <div
                    style={{backgroundColor: getCarRarityColor(car)}}
                    className={classes.rarityLabel}>{getCarRarityName(car)}</div>
                <div className={classes.flyingImageContainer}>
                    <img className={[classes.flyingImage, "mt-3"].join(" ")} src={car.image}
                         style={{filter: `hue-rotate(${car.hue}deg)`}}
                         height={400} alt=""/>
                </div>

                <h2 className={"mt-5"} style={{fontSize: "50px"}}>
                    {car.model}
                </h2>
                <h4 className={[classes.textItalic, "text-muted"].join(" ")}>
                    #{addZerosToId(car.id, 8)}
                </h4>
            </div>
            <MySidebar side="right" width={"50%"} align="center">
                <div className="w-100 d-flex flex-column align-items-center">
                    <ParameterBar title={"Уровень"} value={car.level}></ParameterBar>
                    <ParameterBar title={"Пробег"} value={`${car.mileage} км`}></ParameterBar>
                    <ParameterBar title={"Двигатель"} value={`#${addZerosToId(car.engineId, 8)}`}></ParameterBar>
                    <ParameterBar title={"Шасси"} value={`#${addZerosToId(car.chassisId, 8)}`}></ParameterBar>
                    <MyButton onClick={async () => {
                        let price = await tokenContract.carToPrice(car.id)
                        carContract.buyFromMarketplace(ethers.BigNumber.from(`${car.id}`), {value: price});
                    }
                    }>Купить за {price.toFixed(8)} ETH</MyButton>
                </div>
            </MySidebar>
        </div>
    );
};

export default CarPage;