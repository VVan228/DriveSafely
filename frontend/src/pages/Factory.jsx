import React, {useContext, useEffect, useState} from 'react';
import MySidebar from "../components/UI/sidebar/MySidebar";
import ContractService from "../API/ContractService";
import {AuthContext} from "../context";
import {faker} from "@faker-js/faker";
import factoryImage from "../images/factories/factory.svg"

const Factory = () => {

    const {contract} = useContext(AuthContext)
    const [factory, setFactory] = useState({})

    useEffect(() => {

        const getSomething = async () => {
            const owner = await ContractService.getUserAddress()
            // contract.createCar(faker.vehicle.vehicle())
            return await contract.getFuelStationByOwner(owner);
            // cars.forEach(car => {
            //     console.log(car["model"])
            // })
        }

        getSomething().then(r => {
            console.log(r)
            setFactory(r)
        })

        console.log(factory)

    }, [])


    return (
        <div className="w-100 h-100 d-flex justify-content-between align-items-center text-dark">
            <MySidebar side="left" color="#fff" width="60%" className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100 text-dark">
                    <div>
                        <img src={factoryImage} alt="" height={900}/>
                    </div>
                    {factory.toString()}
                </div>
            </MySidebar>
            <MySidebar side="right" width="40%">
            </MySidebar>
        </div>
    );
};

export default Factory;