import React from 'react';
import CarCard from "../cards/CarCard";
import {NavLink, useNavigate} from "react-router-dom";
import classes from "../cards/Card.module.css";
import MyButton from "../button/MyButton";

const MyDataView = (props) => {

    const navigate = useNavigate()

    return (
        <div className="w-100 h-100 d-flex flex-wrap justify-content-evenly">
            {
                props.items.length != 0 ?
                    props.items.map(item =>
                        props.itemsType === "car" ? <CarCard onClick={() => {navigate(`/roomWaiting/${item.id}`)}} car={item} key={item.id}/> :
                            props.itemsType === "engine" ? <CarCard car={item} key={item.id}/> :
                                <CarCard car={item} key={item.id}/>
                    ) :
                    <div className="row w-100 justify-content-center align-items-center flex-column">
                        <span className="h3 col-auto">Кажется, у Вас нет подходящих машин :(</span>
                        <MyButton className="col-auto mt-5" onClick={() => navigate("/marketplace")}>В магазин</MyButton>
                    </div>
            }
        </div>
    );
};

export default MyDataView;