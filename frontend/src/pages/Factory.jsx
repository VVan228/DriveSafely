import React, {useEffect, useState} from 'react';
import MySidebar from "../components/UI/sidebar/MySidebar";
import Constants from "../constants.js";
import {ethers} from "ethers";
import login from "./Login";
import ContractService from "../API/ContractService";

const Factory = () => {

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(tempProvider)
        console.log("provider: ", provider)

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner)
        console.log("signer: ", signer)

        let tempContract = new ethers.Contract(Constants.CONTRACT_ADDRESS, Constants.ABI, tempSigner);
        setContract(tempContract)
        console.log("contract: ", contract)
    }

    const getSomething = async () => {
        const owner = ContractService.getUserAddress()
        console.log(contract.getCarsByOwner(owner))
        // console.log(contract)
        // await contract.createCar();
    }

    useEffect(() => {
        updateEthers();
        getSomething();
    }, [])


    return (
        <div className="w-100 h-100 d-flex justify-content-between align-items-center">
            <MySidebar side="left" color="#fff" width="60%">
            </MySidebar>
            <MySidebar side="right" width="40%">
            </MySidebar>
        </div>
    );
};

export default Factory;