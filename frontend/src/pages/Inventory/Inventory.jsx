import React, {useState} from 'react';
import {TabView, TabPanel} from 'primereact/tabview';
import Cars from "./Cars";
import Engines from "./Engines";
import Chasisses from "./Chasisses";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import classes from './Inventory.module.css';
import MyButton from "../../components/UI/button/MyButton";

const Inventory = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const pages = [<Cars/>, <Engines/>, <Chasisses/>]

    return (
        <div className="w-100 h-100">

            <div className="h-100 text-center d-flex flex-row justify-content-center">
                <MySidebar side="left">
                    <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100">
                        <MyButton onClick={() => setActiveIndex(0)}>Машинки</MyButton>
                        <MyButton onClick={() => setActiveIndex(1)}>Двигатели</MyButton>
                        <MyButton onClick={() => setActiveIndex(2)}>Шасси</MyButton>
                    </div>

                </MySidebar>
                <div style={{width: "40%"}} className="d-flex align-items-center justify-content-center">
                    {pages[activeIndex]}
                </div>
                <MySidebar side="right">
                    <div>правый сайдбар</div>
                </MySidebar>
            </div>
        </div>
    );
};

export default Inventory;