import React, {useContext, useEffect, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import {AuthContext} from "../../context";
import ContractService from "../../API/ContractService";
import Loader from "../../components/UI/loader/Loader";

const Cars = ({...props}) => {

    const [currentCarIndex, setCurrentCarIndex] = useState(0)
    const {isLoading} = useContext(AuthContext)

    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentCarIndex(index)
        }
    }

    function importAll(r) {
        return r.keys().map(r);
    }

    const images = importAll(require.context('../cars', false, /\.(png|jpe?g|svg)$/));
    console.log(images)

    const getCarImage = (vin) => {
        let sum = vin.toString().split('').reduce(function(a, b) {
            return +a + +b;
        })
        return images[sum % 8]
    }

    const getCarHue = (vin) => {
        return vin % 360;
    }

    /*

    0 - модель
    1 - vin
    2 - id двигателя
    3 - id шасси
    4 - уровень
    5 - миляж
    6 - победы (на уровне)
    7 - поражения (на уровне)
    */

    if (!props.cars[currentCarIndex]) {
        return null;
    }

    const tmp = props.cars
    console.log(`${typeof tmp}: ${tmp}`)


    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className="row flex-nowrap align-items-center w-100 justify-content-center px-3">
            <ItemToggleButton
                style={{
                    visibility: currentCarIndex !== 0 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(props.cars, currentCarIndex - 1);
                }}><i className="pi pi-angle-left" style={{fontSize: "2em"}}></i></ItemToggleButton>

            <div>
                <div><h2 className="text-muted">
                    {props.cars[currentCarIndex][0]}
                </h2></div>
                <div className="mt-5">
                    <img
                        src={getCarImage(props.cars[currentCarIndex][1])}
                        height={400}
                        style={{filter: `hue-rotate(${getCarHue(props.cars[currentCarIndex][1])}deg)`}}
                        alt=""/>
                </div>
                <div className="mt-5"><h2 className="text-muted">
                    {currentCarIndex + 1}/{props.cars.length}
                </h2></div>
            </div>

            <ItemToggleButton
                style={{
                    visibility: currentCarIndex !== props.cars.length - 1 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(props.cars, currentCarIndex + 1);
                }}><i className="pi pi-angle-right" style={{fontSize: "2em"}}></i></ItemToggleButton>
        </div>
    );
};

export default Cars;