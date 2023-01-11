import {ethers} from "ethers";
import {useContext, useState} from "react";

export default class MetamaskService {



    // static accountChangedHandler(newAccount) {
    //     setAccount(newAccount)
    //     getUserBalance(newAccount.toString());
    // }

    static getUserBalance(address) {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => {
                return(ethers.utils.formatEther(balance))
            })

    }

}