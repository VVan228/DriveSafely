import React, {useContext, useEffect, useState} from 'react';
import {TabView, TabPanel} from 'primereact/tabview';
import Cars from "./Cars";
import Engines from "./Engines";
import Chasisses from "./Chasisses";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import classes from './Inventory.module.css';
import MyButton from "../../components/UI/button/MyButton";
import {AuthContext} from "../../context";
import ContractService from "../../API/ContractService";


const Inventory = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const {contract} = useContext(AuthContext)
    const [cars, setCars] = useState([])
    const [engines, setEngines] = useState([])
    const [chassises, setChassises] = useState([])

    useEffect(() => {
        const getCars = async () => {
            const owner = await ContractService.getUserAddress()
            const tmpCars = await contract.getCarsByOwner(owner)
            setCars(tmpCars)
            return tmpCars;
        }

        const getEngines = async () => {
            const owner = await ContractService.getUserAddress()
            const tmpEngines = await contract.getEnginesByOwner(owner)
            setEngines(tmpEngines)
            return tmpEngines;
        }

        const getChassises = async () => {
            const owner = await ContractService.getUserAddress()
            const tmpChassises = await contract.getChassisByOwner(owner)
            setChassises(tmpChassises)
            return tmpChassises;
        }
        getCars().then(r => setCars(r))
        getEngines().then(r => setEngines(r))
        getChassises().then(r => setChassises(r))
        console.log(cars)
    }, [])


    const pages = [
        <Cars cars={cars}/>,
        <Engines engines={engines}/>,
        <Chasisses chassises={chassises}/>
    ]

    return (
        <div className="w-100 h-100">
            <div className="h-100 text-center d-flex flex-row justify-content-center">
                <MySidebar side="left" className="d-flex align-items-center">
                    <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100">
                        <MyButton onClick={() => setActiveIndex(0)}>Машины</MyButton>
                        <MyButton onClick={() => setActiveIndex(1)}>Двигатели</MyButton>
                        <MyButton onClick={() => setActiveIndex(2)}>Шасси</MyButton>
                    </div>
                </MySidebar>
                <div style={{width: "40%"}} className="d-flex align-items-center justify-content-center">
                    {pages[activeIndex]}
                </div>
                <MySidebar side="right">
                    <div></div>
                </MySidebar>
            </div>
        </div>
    );
};

export default Inventory;