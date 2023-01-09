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
    const [contract, setContract] = useState(new ethers.Contract(Constants.CONTRACT_ADDRESS, Constants.ABI, signer))

    // const updateEthers = () => {
    //     let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    //     setProvider(tempProvider)
    //     console.log("provider: ", provider)
    //
    //     let tempSigner = tempProvider.getSigner();
    //     setSigner(tempSigner)
    //     console.log("signer: ", signer)
    //
    //     let tempContract = new ethers.Contract(Constants.CONTRACT_ADDRESS, Constants.ABI, tempSigner);
    //     setContract(tempContract)
    //     console.log("contract: ", contract)
    // }

    useEffect(() => {
        // updateEthers()
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
            contract
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter className="w-100 h-100"/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default App;