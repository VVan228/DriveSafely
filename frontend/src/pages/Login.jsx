import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext, MetamaskContext} from "../context";
import RidingCar from "../components/RidingCar";
import car1 from "./cars/car1.svg"
import car2 from "./cars/car2.svg"
import car3 from "./cars/car5.svg"
import car4 from "./cars/car9.svg"
import ReactWOW from 'react-wow'
import {useNavigate} from "react-router-dom";
import MetamaskService from "../API/MetamaskService";
import Constants from "../constants";
import {ethers} from 'ethers'


const Login = () => {

    const {isAuth, setIsAuth, isMetamaskSet, setIsMetamaskSet} = useContext(AuthContext)
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")



    const connectWallet = () => {
        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(result => {
                    setAccount(result[0])
                    setIsMetamaskSet(true)
                }
            )
        } else {
            console.log("Установите MetaMask")
        }
    }

    setIsAuth(false);
    setIsMetamaskSet(false);
    // const {currentPage, setCurrentPage} = useContext(NavbarContext)
    const navigate = useNavigate()
    const login = event => {
        if (account != null) {
            event.preventDefault()
            setIsAuth(true)
            localStorage.setItem('auth', 'true')
            navigate(`/inventory`)
        } else {
            alert("Что-то пошло не так")
        }
    }

    return (<div className="row h-100">
        <div className="col-4 d-flex flex-column align-items-center justify-content-center wow fadeInLeft">
            <form>
                {/*<MyInput type="text" placeholder="Логин"/>*/}
                {/*<MyInput type="password" placeholder="Пароль"/>*/}
                <div className="row d-flex justify-content-center">
                    <p className="text-center h4 text-muted">{account !== null ? account : ""}</p>
                    <MyButton type="button" className="col-auto" onClick={account !== null ? login : connectWallet}>
                        {account !== null ? `Продолжить` : "Подключить MetaMask"}
                    </MyButton>
                </div>
            </form>
        </div>
        <div style={{clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)"}}
             className="col-8 bg-dark d-flex flex-column align-items-center justify-content-center">
            <div>
                <RidingCar
                    right={60}
                    src={car1}/>
                <RidingCar
                    right={350}
                    src={car2}/>
                <RidingCar
                    right={800}
                    src={car3}/>
                <RidingCar
                    right={1100}
                    src={car4}/>
                <h1 className="text-light" style={{
                    position: "relative", zIndex: "9000", fontSize: 100, fontWeight: 900, fontFamily: "Arial Black"
                }}>Drive</h1>
                <h1 className="" style={{
                    position: "relative", zIndex: "9000", fontSize: 100, fontWeight: 900, color: "#a8d18d"
                }}>Safely!</h1>


            </div>
        </div>
    </div>);
};

export default Login;