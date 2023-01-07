import React from 'react';

const Error = ({message}) => {
    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-light text-center'>Ошибка</h1>
            <p className='text-light text-center'>{message}</p>
        </div>
    );
};

export default Error;