import React, {useContext, useEffect, useState} from 'react';
import classes from "./Card.module.css";
import MyButton from "../button/MyButton";
import {useNavigate} from "react-router-dom";
import {addZerosToId, convertCarsToJsObject, getCarRarityColor, getCarRarityName} from "../../../utils/cars";
import engineImage from "../../../images/engines/engine.svg"
import {ethers} from "ethers";
import {useFetching} from "../../../hooks/useFetching";
import {AuthContext} from "../../../context";
import Loader from "../loader/Loader";

const EngineCard = (props) => {
    const navigate = useNavigate()

    const {engineContract} = useContext(AuthContext)
    const [price, setPrice] = useState(0)

    const [fetchEnginePrice, isEnginePriceLoading, enginePriceError] = useFetching(async () => {
            let response = await engineContract.engineToPrice(parseInt(props.engine.id.toString()))
            setPrice(response)
            return response;
        }
    )

    useEffect(() => {
        fetchEnginePrice()
        console.log(price)
    }, [])

    return (
        isEnginePriceLoading ? <Loader/> :
            <div className={classes.myMarketplaceCard}>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <img
                        onClick={() => navigate(`/engines/${ethers.utils.formatEther(props.engine.id)}`)}
                        src={engineImage}
                        alt=""
                        height={170}
                        style={{
                            filter: `hue-rotate(${props.engine.hue}deg)`
                        }}
                    />
                    {/*<MyButton onClick={props.onClick} color="secondary" className={classes.selectCarButton}>Поехали!</MyButton>*/}
                    <div className={classes.description}>
                        <h3 className="text-center">#{addZerosToId(props.engine.id.toString(), 8)}</h3>
                        <h6>Мощность: <b>{props.engine.horsePowers}</b> л.с.</h6>
                        <MyButton>Купить за {price}</MyButton>
                    </div>
                </div>
            </div>
    );
};

export default EngineCard;