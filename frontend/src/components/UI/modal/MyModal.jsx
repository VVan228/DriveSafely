import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e)=> e.stopPropagation()}>
                <button className={classes.closeBtn} onClick={() => setVisible(false)}>
                    <i className="bi bi-x"></i>
                </button>
                {children}
            </div>
        </div>
    );
};

export default MyModal;