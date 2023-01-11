import React, {useState} from 'react';
import ItemToggleButton from "../button/ItemToggleButton";

const MyArrayToggle = ({children, ...props}) => {

    const [currentItemIndex, setCurrentItemIndex] = useState(0)

    const toggleItem = (index) => {
        if (index > -1 && index !== props.array.length) {
            setCurrentEngineIndex(index)
        }
    }

    return (
        <div>
            <ItemToggleButton
                side="left"
                style={{float: 'left'}}
                onClick={() => {
                    toggleItem(currentItemIndex - 1);
                    console.log(currentEngineIndex)
                }}><i className="pi pi-angle-left"></i></ItemToggleButton>
            {children}
            <ItemToggleButton
                side="right"
                style={{float: 'right'}}
                onClick={() => {
                    toggleItem(currentItemIndex + 1);
                }}/>
        </div>
    );
};

export default MyArrayToggle;