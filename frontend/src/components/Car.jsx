import React from 'react';

const Car = (props) => {
    return (
        <div style={{
            position: "absolute",
            transform: `rotate(${props.rotate}deg)`,
            bottom: `${props.position.y}%`,
            left: `${props.position.x}%`,
            width: props.width,
            height: props.height
        }}>
            <img src={props.car.image} alt=""/>
            {/*<span className="h2 position-absolute top-50 left-50 bg-light">{props.rotate / 90}</span>*/}
        </div>
    );
};

export default Car;
