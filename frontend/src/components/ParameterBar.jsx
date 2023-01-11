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
                        {props.icon ?
                            <button className={classes.toggleButton} style={{backgroundColor: "#ECA553"}} onClick={() => props.action} data-bs-toggle="modal" data-bs-target={`#${props.modal}`}>{props.icon}</button>: ""}
                    </div>
            </div>
        </div>
    );
};

export default ParameterBar;