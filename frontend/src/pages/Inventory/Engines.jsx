import React, {useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";
import  engine  from "./engine.svg";


const Engines = () => {

    const img = <img src={engine} height="300"/>;

    const engines = [
        {name: "engine 1", img: img},
        {name: "engine 2", img: img},
        {name: "engine 3", img: img},
        {name: "engine 4", img: img},
        {name: "engine 5", img: img},
        {name: "engine 6", img: img},
        {name: "engine 7", img: img},
        {name: "engine 8", img: img},
        {name: "engine 9", img: img},
    ]

    const [currentEngineIndex, setCurrentEngineIndex] = useState(0)

    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentEngineIndex(index)
        }
    }

    return (
        <div className="row">
            <ItemToggleButton
                // style={{float: 'left'}}
                onClick={() => {
                    toggleItem(engines, currentEngineIndex - 1);
                    console.log(currentEngineIndex)
                }}><i className="pi pi-angle-left"></i></ItemToggleButton>

            <div>
                    <div>{engines[currentEngineIndex].img}</div>
                    <div><h2>{engines[currentEngineIndex].name}</h2></div>
            </div>

            <ItemToggleButton
                // style={{float: 'right'}}
                onClick={() => {
                toggleItem(engines, currentEngineIndex + 1);
                console.log(currentEngineIndex)
            }}><i className="pi pi-angle-right"></i></ItemToggleButton>
        </div>
    );
};

export default Engines;