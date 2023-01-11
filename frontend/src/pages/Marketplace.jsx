import React from 'react';
import {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import {ethers} from "ethers"
import MySidebar from "../components/UI/sidebar/MySidebar";
import Navbar from "../components/UI/navbar/Navbar";

const Marketplace = () => {

    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")



    return (
        <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
            <Navbar/>
            <MySidebar side="left"></MySidebar>
        </div>
    );
};

export default Marketplace;