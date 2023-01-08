import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";
import WOW from 'wowjs';
import Web3 from 'web3';


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isMetamaskSet, setIsMetamaskSet] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setisLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isMetamaskSet,
            setIsMetamaskSet,
            isLoading,
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter className="w-100 h-100"/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;