import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import {AuthContext} from "./context";
import {ethers} from "ethers";
import Constants from "./constants";


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [signer, setSigner] = useState(provider.getSigner())
    const [tokenContract, setTokenContract] = useState(new ethers.Contract(Constants.TOKEN_OWNERSHIP_ADDRESS, Constants.TOKEN_OWNERSHIP_ABI, signer))
    const [engineContract, setEngineContract] = useState(new ethers.Contract(Constants.ENGINE_OWNERSHIP_ADDRESS, Constants.ENGINE_OWNERSHIP_ABI, signer))
    const [chassisContract, setChassisContract] = useState(new ethers.Contract(Constants.CHASSIS_OWNERSHIP_ADDRESS, Constants.CHASSIS_OWNERSHIP_ABI, signer))
    const [carContract, setCarContract] = useState(new ethers.Contract(Constants.CAR_OWNERSHIP_ADDRESS, Constants.CAR_OWNERSHIP_ABI, signer))

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])


    return (
        <AuthContext.Provider value={{
            account,
            setAccount,
            isAuth,
            setIsAuth,
            isLoading,
            tokenContract,
            carContract,
            engineContract,
            chassisContract
            // contract2
        }}>
            <BrowserRouter>
                {/*<Navbar/>*/}
                <AppRouter className="w-100 h-100"/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;