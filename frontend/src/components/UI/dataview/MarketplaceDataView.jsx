import React, {useEffect} from 'react';
import CarCard from "../cards/CarCard";
import {NavLink, useNavigate} from "react-router-dom";
import classes from "../cards/Card.module.css";
import MyButton from "../button/MyButton";
import MarketplaceCarCard from "../cards/MarketplaceCarCard";
import Loader from "../loader/Loader";
import EngineCard from "../cards/EngineCard";
import ChassisCard from "../cards/ChassisCard";

const MarketplaceDataView = (props) => {


    // useEffect(()=> {
    //     console.log(props.items)
    // }, [])
    return (
        <div className="w-100 d-flex flex-wrap justify-content-evenly align-items-center" style={props.style}>
            {
                !props.items || !props.isLoading ?
                    props.items.map(item =>
                        props.itemsType === "car" ? <MarketplaceCarCard onClick={() => {window.open(`/race?carId=${item.id}`)}} car={item} key={item.id}/> :
                            props.itemsType === "engine" ? <EngineCard engine={item} key={item.id}/> :
                                props.itemsType === "chassis" ? <ChassisCard chassis={item} key={item.id}/> : ""
                    ) :

                    <div className="row w-100 justify-content-center align-items-center flex-column">
                        <Loader></Loader>
                    </div>
            }
        </div>
    );
};

export default MarketplaceDataView;