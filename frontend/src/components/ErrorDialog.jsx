import React from 'react';

const ErrorDialog = (message) => {
    return (
        <div className={"w-100 h-100 d-flex align-items-center justify-content-center"}>
            <h3>Упс :(</h3>
            <span>{message}</span>
        </div>
    );
};

export default ErrorDialog;