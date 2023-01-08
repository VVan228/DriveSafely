import React, {useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import engine from "./engine.svg";


const Engines = () => {

    const img = <img src={engine} height="300" alt="engine"/>;

    const engines = [
        {name: "#034331232", img: img},
        {name: "#054457232", img: img},
        {name: "#245757564", img: img},
        {name: "#245645656", img: img},
        {name: "#456745672", img: img},
        {name: "#467935644", img: img},
        {name: "#653245988", img: img},
        {name: "#245624445", img: img},
        {name: "#000845672", img: img},
    ]

    const [currentEngineIndex, setCurrentEngineIndex] = useState(0)

    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentEngineIndex(index)
        }
    }

    return (
        <div className="row flex-nowrap align-items-center w-100 justify-content-center">

             <ItemToggleButton
                style={{
                    visibility: currentEngineIndex !== 0 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(engines, currentEngineIndex - 1);
                    console.log(currentEngineIndex)
                }}><i className="pi pi-angle-left" style={{fontSize: "2em"}}></i></ItemToggleButton>

            <div>
                <div><h2 className="text-muted">{engines[currentEngineIndex].name}</h2></div>
                <div className="mt-5">{engines[currentEngineIndex].img}</div>
                <div className="mt-5"><h2 className="text-muted">{currentEngineIndex + 1}/{engines.length}</h2></div>
            </div>

            <ItemToggleButton
                style={{
                    visibility: currentEngineIndex !== engines.length - 1 ? "visible" : "hidden"}}
                onClick={() => {
                    toggleItem(engines, currentEngineIndex + 1);
                    console.log(currentEngineIndex)
                }}><i className="pi pi-angle-right" style={{fontSize: "2em"}}></i></ItemToggleButton>
        </div>
    );
};

export default Engines;