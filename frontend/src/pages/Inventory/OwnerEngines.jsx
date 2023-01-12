import React, {useContext, useEffect, useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import engine from "../../images/engines/engine.svg";
import {AuthContext} from "../../context";
import {useFetching} from "../../hooks/useFetching";
import ContractService from "../../API/ContractService";
import Engine, {convertEnginesToJsObject} from "../../utils/engines";
import Loader from "../../components/UI/loader/Loader";
import engineImage from "../../images/engines/engine.svg";


const OwnerEngines = ({...props}) => {

    const {tokenContract} = useContext(AuthContext)
    const [currentEngineIndex, setCurrentEngineIndex] = useState(0)
    const [opacity, setOpacity] = useState(0)

    //СТЕЙТЫ МОДАЛОК
    const [showLevelUpModal, setShowLevelUpModal] = useState(false)
    const [showEngineChangeModal, setShowEngineChangeModal] = useState(false)
    const [showChassisChangeModal, setShowChassisChangeModal] = useState(false)
    const [showSellModal, setShowSellModal] = useState(false)

    const [engines, setEngines] = useState([new Engine(0, 0, 0)])

    const [fetchEngines, isEnginesLoading, enginesError] = useFetching(async () => {
            const owner = await ContractService.getUserAddress()
            let response = await tokenContract.getEnginesByOwner(owner)
            await setEngines(await convertEnginesToJsObject(response))
            return response;
        }
    )

    const toggleItem = (array, index) => {
        if (index > -1 && index !== array.length) {
            setCurrentEngineIndex(index)
        }
    }

    useEffect(() => {
        fetchEngines()
    }, [])


    if (isEnginesLoading) {
        return <Loader/>
    }
    return (
        isEnginesLoading ? <Loader/> :
        <div className="row flex-nowrap align-items-center w-100 justify-content-center px-3">

             <ItemToggleButton
                style={{
                    visibility: currentEngineIndex !== 0 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(engines, currentEngineIndex - 1);
                }}><i className="pi pi-angle-left" style={{fontSize: "2em"}}></i></ItemToggleButton>

            <div>
                <div><h2 className="text-muted">{engines[currentEngineIndex].id}</h2></div>
                <div className="mt-5">
                    <img src={engines[currentEngineIndex].image} style={{filter: `hue-rotate(${engines[currentEngineIndex].hue}deg)`}}/>
                </div>
                <div className="mt-5"><h2 className="text-muted">{currentEngineIndex + 1}/{engines.length}</h2></div>
            </div>

            <ItemToggleButton
                style={{
                    visibility: currentEngineIndex !== engines.length - 1 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(engines, currentEngineIndex + 1);
                }}><i className="pi pi-angle-right" style={{fontSize: "2em"}}></i></ItemToggleButton>
        </div>
    );
};

export default OwnerEngines;