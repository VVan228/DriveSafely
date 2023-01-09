import React, {useContext, useEffect, useState} from 'react';
import Cars from "./Cars";
import Engines from "./Engines";
import Chasisses from "./Chasisses";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import MyButton from "../../components/UI/button/MyButton";
import {AuthContext} from "../../context";
import ContractService from "../../API/ContractService";
import Loader from "../../components/UI/loader/Loader";


const Inventory = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const {contract, isLoading} = useContext(AuthContext)
    const [cars, setCars] = useState([])
    const [engines, setEngines] = useState([])
    const [chassises, setChassises] = useState([])

    useEffect(() => {
        const getCars = async () => {
            const owner = await ContractService.getUserAddress()
            return await contract.getCarsByOwner(owner);
        }

        const getEngines = async () => {
            const owner = await ContractService.getUserAddress()
            return await contract.getEnginesByOwner(owner);
        }

        const getChassises = async () => {
            const owner = await ContractService.getUserAddress()
            return await contract.getChassisByOwner(owner);
        }

        getCars().then(r => setCars(r))
        getEngines().then(r => setEngines(r))
        getChassises().then(r => setChassises(r))
    }, [])

    const pages = [
        <Cars cars={cars}/>,
        <Engines engines={engines}/>,
        <Chasisses chassises={chassises}/>
    ]

    if (isLoading) {
        return <Loader/>
    }

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