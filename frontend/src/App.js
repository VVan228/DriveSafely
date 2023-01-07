import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link, Switch} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";


function App() {
    const [isAuth, setIsAuth] = useState(false);
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
            isLoading
        }}>
            <BrowserRouter >
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;