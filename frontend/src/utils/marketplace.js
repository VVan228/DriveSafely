import {useContext} from "react";
import {AuthContext} from "../context";
import {getDummyCars} from "./cars";



export const getItemsFromMarketplace = async (contract, items) => {
    console.log(contract)
    switch (items) {
        case "cars":
            return(getDummyCars(10))
            break
        case "engines":
            break
        case "chassis":
            break
    }
}