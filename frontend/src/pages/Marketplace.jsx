import React from 'react';
import {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import {ethers} from "ethers"

const Marketplace = () => {

    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")



    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 flex-column">
            <p>Address:</p>
            <p>{account}</p>
            <p>Balance:</p>
            <p>{balance}</p>
            <p>{errorMessage}</p>
        </div>
    );
};

export default Marketplace;