import React, {useEffect, useState} from 'react';
import classes from "./Pages.module.css";
import WorldPreview from "../components/WorldPreview";
import city from '../images/cities/city2.jpg'

const Competitions = () => {


    const totalWidth = window.innerWidth * 10
    const [offset, setOffset] = useState(0)
    const [scale, setScale] = useState(1)
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

     useEffect(()=>{
         setScale(0.8)
         setTimeout(()=>{
             setScale(1)
         }, 100)
     }, [offset])

    return (

        <div>
            <div className={classes.bottomSphere}/>
            <div style={{
                width: `${totalWidth}px`,
                height: "100%",
                left: `${-offset}px`,
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
                        <WorldPreview src = {city} level={world.id} style={{transform: `scale(${scale})`}}/>
                    </div>
                )}
            </div>
            <div className={classes.toggleBtnsContainer}>
                <button
                    className={classes.toggleButton}
                    onClick={() => {
                        setOffset(offset - window.innerWidth)
                        console.log(offset)
                    }}
                ><i className="pi pi-angle-left" style={{fontSize: "2em"}}></i>
                </button>
                <button
                    className={classes.toggleButton}
                    onClick={() => {
                        setOffset(offset + window.innerWidth)
                        console.log(offset)
                    }}
                ><i className="pi pi-angle-right" style={{fontSize: "2em"}}></i>
                </button>
            </div>

        </div>
    );
};

export default Competitions;