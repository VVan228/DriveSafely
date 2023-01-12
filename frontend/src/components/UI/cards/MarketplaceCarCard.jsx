import React from 'react';
import {getCarImage, getCarRarityColor, getCarRarityName, getUniqueCarImage} from "../../../utils/cars";
import classes from "./Card.module.css";
import MyButton from "../button/MyButton";
import {useNavigate} from "react-router-dom";

const MarketplaceCarCard = (props) => {
    const navigate = useNavigate()
    return (
        <div className={classes.myMarketplaceCard} style={{borderColor: getCarRarityColor(props.car)}}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div
                    className={classes.rarityLabel}
                    style={{backgroundColor: getCarRarityColor(props.car)}}
                >{getCarRarityName(props.car)}</div>
                <img
                    onClick={() => navigate(`/cars/${props.car.id}`)}
                    src={props.car.image}
                    alt=""
                    height={200}
                    style={{
                        filter: `hue-rotate(${props.car.hue}deg)`
                    }}
                />
                {/*<MyButton onClick={props.onClick} color="secondary" className={classes.selectCarButton}>Поехали!</MyButton>*/}
                <div className={classes.description}>
                    <h3 className="text-center">{props.car.model}</h3>
                    <h6>Уровень {props.car.level}</h6>
                </div>
            </div>
        </div>
    );
};

export default MarketplaceCarCard;