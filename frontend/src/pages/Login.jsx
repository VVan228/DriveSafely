import React, {useContext, useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import LoginPageRidingCar from "../components/LoginPageRidingCar";
import car1 from "./cars/car1.svg"
import car2 from "./cars/car2.svg"
import car3 from "./cars/car5.svg"
import car4 from "./cars/car9.svg"
import {useNavigate} from "react-router-dom";
import MySidebar from "../components/UI/sidebar/MySidebar";


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
    // @todo пофиксить логин и разлогин
    // useEffect(()=> {setIsAuth(false)}, [])
    // const {currentPage, setCurrentPage} = useContext(NavbarContext)
    const navigate = useNavigate()
    const login = event => {
        if (account != null && isAuth) {
            event.preventDefault()
            setIsAuth(true)
            localStorage.setItem('auth', 'true')
            navigate(`/inventory`)
        } else {
            alert("Что-то пошло не так")
        }
    }

    return (
        <div className="row h-100 justify-content-between">
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
        <MySidebar side="right" width="60%" align="center">
            <div>
                <h1 className="text-light"
                    style={{
                    position: "relative", zIndex: "9000", fontSize: 100, fontWeight: 900, fontFamily: "Arial Black", fontStyle: "italic" }}>
                    Drive</h1>
                <h1 className="" style={{
                    position: "relative", zIndex: "9000", fontSize: 100, fontWeight: 900, color: "#a8d18d", fontFamily: "Arial Black", fontStyle: "italic"
                }}>Safely!</h1>
                <LoginPageRidingCar
                right={60}
                src={car1}/>
                <LoginPageRidingCar
                    right={350}
                    src={car2}/>
                <LoginPageRidingCar
                    right={800}
                    src={car3}/>
                <LoginPageRidingCar
                    right={1100}
                    src={car4}/>


            </div>
        </MySidebar>
    </div>);
};

export default Login;