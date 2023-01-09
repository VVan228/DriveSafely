import React, {useEffect, useState} from 'react';
import classes from "./Pages.module.css";
import WorldPreview from "../components/WorldPreview";
import city from '../images/cities/city.jpg'
import AnimatedPage from "../components/AnimatedPage";

const Competitions = () => {


    const totalWidth = window.innerWidth * 10
    const [offset, setOffset] = useState(0)
    const [scale, setScale] = useState(1)
    const [opacity, setOpacity] = useState(1)
    const [worldContainerBottom, setWorldContainerBottom] = useState("-100%")
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
         setScale(0.2)
         setOpacity(0)
         setTimeout(()=>{
             setOpacity(1)
             setScale(1)
         }, 300)
     }, [offset])

    useEffect(() => {
        setWorldContainerBottom("10%")
    }, [window.location])

    return (

        <AnimatedPage>
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
                        <WorldPreview src = {city} level={world.id} hueRotate ={360/worlds.length * world.id} style={{transform: `scale(${scale})`, zIndex: 120, opacity: opacity, transition: ".3s"}}/>
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

        </AnimatedPage>
    );
};

export default Competitions;