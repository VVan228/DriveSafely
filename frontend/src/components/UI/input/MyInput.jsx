import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = (props) => {
    return (
        <div className="d-flex row"><input {...props} className={[classes.myInput, "text-center"].join(" ")}/></div>
    );
};

export default MyInput;