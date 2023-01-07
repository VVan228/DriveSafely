import React, {useState} from 'react';
import ItemToggleButton from "../../components/UI/button/ItemToggleButton";

const Cars = () => {

    const cars = [
        {name: "car1"},
        {name: "car2"},
        {name: "car3"},
        {name: "car4"},
        {name: "car5"},
        {name: "car6"},
        {name: "car7"},
        {name: "car8"},
        {name: "car9"},
    ]

    const [currentCarIndex, setCurrentCarIndex] = useState(0)

    const toggleItem = (array, index) => {
        if (index > -1 && index != array.length) {
            setCurrentCarIndex(index)
        }
    }

    return (
        <div>
            <ItemToggleButton onClick={() => {
                setCurrentCarIndex(currentCarIndex - 1);
                console.log(currentCarIndex)
            }}><i className="pi pi-angle-left"></i></ItemToggleButton>
            {cars[currentCarIndex].name}
            <ItemToggleButton onClick={() => {
                setCurrentCarIndex(currentCarIndex + 1);
                console.log(currentCarIndex)
            }}><i className="pi pi-angle-right"></i></ItemToggleButton>
        </div>
    );
};

export default Cars;