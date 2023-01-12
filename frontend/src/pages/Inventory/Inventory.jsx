import React, {useState} from 'react';
import OwnerCars from "./OwnerCars";
import OwnerEngines from "./OwnerEngines";
import OwnerChassis from "./OwnerChassis";
import MySidebar from "../../components/UI/sidebar/MySidebar";
import MyButton from "../../components/UI/button/MyButton";
import Loader from "../../components/UI/loader/Loader";
import Navbar from "../../components/UI/navbar/Navbar";


const Inventory = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const pages = [
        <OwnerCars/>,
        <OwnerEngines/>,
        <OwnerChassis/>
    ]

    return (
            <div className="row p-0 h-100 text-center d-flex flex-row justify-content-between">
                <Navbar/>
                <MySidebar side="left" align="start" className="col-4 d-flex align-items-center" width="30%">
                    <div className="d-flex flex-column align-items-center justify-content-center col-3 w-100">
                        <MyButton onClick={() => setActiveIndex(0)}>Машины</MyButton>
                        <MyButton onClick={() => setActiveIndex(1)}>Двигатели</MyButton>
                        <MyButton onClick={() => setActiveIndex(2)}>Шасси</MyButton>
                    </div>
                </MySidebar>

                <div className="col-8 p-0 d-flex align-items-center justify-content-center">
                    {pages[activeIndex]}
                </div>
            </div>
    );
};

export default Inventory;