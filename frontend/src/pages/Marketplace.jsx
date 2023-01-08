import React from 'react';
import {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import {ethers} from "ethers"
import MySidebar from "../components/UI/sidebar/MySidebar";

const Marketplace = () => {

    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")



    return (
        <div className="d-flex justify-content-between align-items-center w-100 h-100 flex-row">
            <MySidebar side="left"></MySidebar>
            <div>d</div>
        </div>
    );
};

export default Marketplace;