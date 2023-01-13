import React, {useContext, useEffect, useRef, useState} from 'react';
import classes from "./Pages.module.css";
import WorldPreview from "../components/WorldPreview";
import city from '../images/cities/city.jpg'
import AnimatedPage from "../components/AnimatedPage";
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import ContractService from "../API/ContractService";
import {convertCarsToJsObject, getCarsOnLevel, getDummyCars, getLevelUpCost} from "../utils/cars";
import {ethers} from "ethers";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/UI/navbar/Navbar";
import {DataView} from "primereact/dataview";
import MyDataView from "../components/UI/dataview/MyDataView";
import CarCard from "../components/UI/cards/CarCard";
import Loader from "../components/UI/loader/Loader";

const Competitions = () => {


    const [totalWidth, setTotalWidth] = useState(window.innerWidth * 10)
    const [offset, setOffset] = useState(0)
    const [scale, setScale] = useState(1)
    const [selectedWorld, setSelectedWorld] = useState(1)
    const [worldOpacity, setWorldOpacity] = useState(1)
    const [buttonsOpacity, setButtonsOpacity] = useState(1)
    const [worldContainerBottom, setWorldContainerBottom] = useState("-100%")
    const modal = useRef()
    const [showModal, setShowModal] = useState(false)


    const {tokenContract, isLoading} = useContext(AuthContext)
    const [cars, setCars] = useState([])
    const [engines, setEngines] = useState([])
    const [chassis, setChassis] = useState([])


    const [fetchCars, isCarsLoading, carsError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getCarsByOwner(owner)
            // await setCars(await convertCarsToJsObject(response))
            setCars(await convertCarsToJsObject(response))
            return response;
        }
    )

    const [fetchEngines, isEnginesLoading, enginesError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            const response = await tokenContract.getEnginesByOwner(owner)
            setEngines(response)
        }
    )

    const [fetchChassis, isChassisLoading, chassisError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            const response = await tokenContract.getChassisByOwner(owner)
            setChassis(response)
        }
    )

    const navigate = useNavigate()


    // console.log(totalWidth)
    const worlds = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 10},
    ]

    useEffect(() => {
        setScale(0.2)
        setWorldOpacity(0)
        setTimeout(() => {
            setWorldOpacity(1)
            setScale(1)
        }, 300)
    }, [offset])

    useEffect(() => {
        setWorldContainerBottom("10%")
    }, [window.location])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTotalWidth(window.innerWidth * 10)
        });
    }, [])

    useEffect(
        () => {
            fetchCars()
            fetchEngines()
            fetchChassis()
        }, []
    )

    return (
        isCarsLoading ? <Loader/> :
            <div className="p-0 h-100">
                <Navbar/>
                <div className={classes.competitionsContainer}>
                    <div className={classes.bottomSphere}>
                    </div>
                    <div style={{
                        width: `${totalWidth}px`,
                        left: `${-offset}px`,
                        bottom: worldContainerBottom,
                        position: "absolute",
                        transition: ".3s ease"
                    }}
                         className="d-flex">
                        {worlds.map(world =>
                            <div
                                world-id={world.id}
                                key={world.id}
                                style={{
                                    // backgroundColor: world.color,
                                    width: window.innerWidth,
                                    height: "100%",
                                }}
                                className="d-flex justify-content-center align-items-center"
                            >
                                <WorldPreview
                                    src={city}
                                    level={world.id}
                                    hueRotate={360 / worlds.length * world.id}
                                    style={{
                                        transform: `scale(${scale})`,
                                        zIndex: 120,
                                        opacity: worldOpacity,
                                        transition: ".3s"
                                    }}
                                    onClick={() => {
                                        setSelectedWorld(world.id)
                                        setShowModal(true)
                                        // setWorldContainerBottom("-100%")
                                        // modal.modal('toggle')
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className={classes.toggleBtnsContainer}>
                        {offset > 0 ? <button
                            className={classes.toggleButton}
                            onClick={() => {
                                setOffset(offset - window.innerWidth)
                                console.log(offset)
                            }}
                        ><i className="pi pi-angle-left" style={{fontSize: "2em"}}></i>
                        </button> : <div></div>}
                        {offset < window.innerWidth * (worlds.length - 1) ? <button
                            className={classes.toggleButton}
                            onClick={() => {
                                setOffset(offset + window.innerWidth)
                                console.log(offset)
                            }}
                        ><i className="pi pi-angle-right" style={{fontSize: "2em"}}></i>
                        </button> : <div></div>}
                    </div>


                </div>
                <MyModal
                    ref={modal}
                    isShowing={showModal}
                    close={() => setShowModal(false)}
                    title={`Мир ${selectedWorld}`}
                    subTitle={`Выберите машину:`}
                    modalId="selectCar"
                    showConfirmButton={false}
                    confirmButtonText={`Поехали`}
                    confirmButtonAction={async () => {
                    }}
                >
                    {/*{cars.map(car =>*/}
                    {/*    <div key={car.id}>*/}
                    {/*        <h1 className="text-light">{car.model}</h1>*/}
                    {/*        <MyButton onClick={() => navigate(`/race/${car.id}`)}>Поехали</MyButton>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    <MyDataView items={getCarsOnLevel(cars, (selectedWorld - 1) * 10)} layout="grid"
                                itemsType="car"/>
                </MyModal>
            </div>
    );
};

export default Competitions;