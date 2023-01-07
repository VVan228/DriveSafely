import React from 'react';
import classes from "./MySelect.module.css";

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <div className="d-flex row">
            <select className={classes.mySelect} value={value} onChange={event => onChange(event.target.value)}>
                <option disabled selected value="default">{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                )}
            </select>
        </div>
    );
};

export default MySelect;