import React, {useContext, useEffect, useRef} from 'react';
import {useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import {ethers} from "ethers"
import MySidebar from "../components/UI/sidebar/MySidebar";
import Navbar from "../components/UI/navbar/Navbar";
import {getItemsFromMarketplace} from "../utils/marketplace";
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import CarsFilter from "../components/CarsFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MarketplaceDataView from "../components/UI/dataview/MarketplaceDataView";
import {convertCarsToJsObject, getCarsOnLevel, getDummyCars} from "../utils/cars";
import {useItems} from "../hooks/useItems";
import ContractService from "../API/ContractService";
import {convertEnginesToJsObject} from "../utils/engines";
import {convertChassisesToJsObject, convertChassisToJsObject} from "../utils/chassis";


const Marketplace = () => {


    const {tokenContract, carContract, engineContract, chassisContract} = useContext(AuthContext)

    const [cars, setCars] = useState([])
    const [engines, setEngines] = useState([])
    const [chassis, setChassis] = useState([])

    const [showingItems, setShowingItems] = useState(cars)
    const [showingItemsType, setShowingItemsType] = useState("car")

    const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
            let response = await tokenContract.getCarsForSale()
            await setCars(await convertCarsToJsObject(response))
            return response;
        }
    )

    const [fetchEngines, isEnginesLoading, engineError] = useFetching(async () => {
            let response = await tokenContract.getEnginesForSale()
            await setEngines(convertEnginesToJsObject(response))
            return response;
        }
    )

    const [fetchChassis, isChassisLoading, chassisError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getChassisForSale()
            await setChassis(await convertChassisesToJsObject(response))
            return response;
        }
    )


    useEffect(() => {
        fetchCars()
        fetchEngines()
        fetchChassis()
    }, [])

    useEffect(() => {
        setShowingItems(cars)
        // setShowingItems(getDummyCars(20))
    }, [cars])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndSearchedItems = useItems(showingItems, filter.sort, filter.query);


    if (carsError) {
        return <h1>Произошла ошибка {carsError}</h1>
    } else if (isCarsLoading || isEnginesLoading || isChassisLoading) {
        console.log(`Waiting for cars to load from ${tokenContract.address.toString()}`)
        return
        <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between"><Loader/></div>
    }
    return (
        isCarsLoading || isEnginesLoading || isChassisLoading ?
            <Loader></Loader>
            : <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
                <Navbar/>
                <MySidebar side="left" width={"30%"} align={"center"}>
                    <div className={"d-flex flex-column"}>
                        <MyButton onClick={() => {
                            setShowingItems(cars)
                            setShowingItemsType("car")
                        }}>
                            Машины
                        </MyButton>
                        <MyButton onClick={() => {
                            setShowingItems(engines)
                            setShowingItemsType("engine")
                        }}>
                            Двигатели
                        </MyButton>
                        <MyButton onClick={() => {
                            setShowingItems(chassis)
                            setShowingItemsType("chassis")
                        }}>
                            Шасси
                        </MyButton>

                    </div>
                </MySidebar>
                {showingItems === [] ? <Loader/> :
                    showingItems.length === 0 ?
                        <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>Пусто</div>
                        : <div className={"col"} style={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden"
                        }}>
                            <MarketplaceDataView
                                isLoading={isCarsLoading || isEnginesLoading || isChassisLoading}
                                items={showingItems}
                                layout="grid"
                                itemsType={showingItemsType}
                                style={{
                                    width: "100%",
                                    height: "90%",
                                    overflowY: "scroll",
                                    paddingRight: "17px", /* Increase/decrease this value for cross-browser compatibility */
                                    boxSizing: "content-box" /* So the width will be 100% + 17px */
                                }}
                            />
                            {/*<div ref={lastElement}/>*/}


                        </div>}

            </div>
    );
}


export default Marketplace;