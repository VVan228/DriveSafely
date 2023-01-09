import React, {useContext, useEffect, useState} from 'react';
import Cars from "./Cars";
import Engines from "./Engines";
import Chasisses from "./Chasisses";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import MyButton from "../../components/UI/button/MyButton";
import {AuthContext} from "../../context";
import ContractService from "../../API/ContractService";
import Loader from "../../components/UI/loader/Loader";
import {useFetching} from "../../hooks/useFetching";
import PostService from "../../API/PostService";
// import {Car} from "../../utils/cars";


const Inventory = () => {

    const [activeIndex, setActiveIndex] = useState(1);

    const {contract, isLoading} = useContext(AuthContext)
    // const [cars, setCars] = useState([])
    // const [engines, setEngines] = useState([])
    // const [chassis, setChassis] = useState([])
    //
    //
    // const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
    //         const owner = await ContractService.getUserAddress()
    //         const response = await contract.getCarsByOwner(owner)
    //         setCars(response)
    //     }
    // )
    //
    // const [fetchEngines, isEnginesLoading, enginesError] = useFetching(async () => {
    //         const owner = await ContractService.getUserAddress()
    //         const response = await contract.getEnginesByOwner(owner)
    //         setEngines(response)
    //     }
    // )
    //
    // const [fetchChassis, isChassisLoading, chassisError] = useFetching(async () => {
    //         const owner = await ContractService.getUserAddress()
    //         const response = await contract.getChassisByOwner(owner)
    //         setChassis(response)
    //     }
    // )


    useEffect(
        () => {
            // fetchCars()
            // fetchEngines()
            // fetchChassis()
            // const car = new Car("Tesla Silvia", 1221221, 0, 0, 1, 187200, 10, 0)
            // console.log(car)
            // setCars([car])
        }, []
    )


    const pages = [
        <Cars/>,
        <Engines/>,
        <Chasisses/>
    ]

    if (isLoading) {
        return <Loader/>
    }

    return (
            <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
                <MySidebar side="left" align="start" className="col-4 d-flex align-items-center" width="30%">
                    <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100">
                        <MyButton onClick={() => setActiveIndex(0)}>Машины</MyButton>
                        <MyButton onClick={() => setActiveIndex(1)}>Двигатели</MyButton>
                        <MyButton onClick={() => setActiveIndex(2)}>Шасси</MyButton>
                    </div>
                </MySidebar>

                <div className="col-8 p-0 d-flex align-items-center justify-content-center">
                    {pages[activeIndex]}
                </div>
                {/*<MySidebar side="right">*/}
                {/*    <div></div>*/}
                {/*</MySidebar>*/}
            </div>
    );
};

export default Inventory;