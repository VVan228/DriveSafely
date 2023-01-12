import React from 'react';

const EngineSelectCard = (engine) => {
    return (
        <div>
            <h3>{engine.id}</h3>
            <img src={engine.img} alt=""/>
        </div>
    );
};

export default EngineSelectCard;