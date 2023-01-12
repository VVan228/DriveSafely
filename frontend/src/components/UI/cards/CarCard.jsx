import React from 'react';
import {getCarImage, getUniqueCarImage} from "../../../utils/cars";
import classes from "./Card.module.css";
import MyButton from "../button/MyButton";

const CarCard = (props) => {
    return (
        <div className={classes.myCard}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <img src={props.car.image} alt="" height={200}/>
                <MyButton onClick={props.onClick} color="secondary" className={classes.selectCarButton}>Поехали!</MyButton>
                <div className={classes.description}>
                    <h3 className="text-center">{props.car.model}</h3>
                    <h6>Уровень {props.car.level}</h6>
                </div>
            </div>
        </div>
    );
};

export default CarCard;