import React from 'react';
import classes from "../pages/Pages.module.css";
import ItemToggleButton from "./UI/button/ItemToggleButton";

const ParameterBar = (props) => {
    return (
        <div className="col-6">
            <div className="row">
                <div className="col-10 d-flex flex-column align-items-center">
                    <h3 className={classes.textItalic}>{props.title}:</h3>
                    <h3 className={classes.yellowText}>{props.value}</h3>
                </div>

                    <div className="col-2">
                        {props.icon ?<ItemToggleButton onClick={() => props.action}>{props.icon}</ItemToggleButton>: ""}
                    </div>
            </div>
        </div>
    );
};

export default ParameterBar;