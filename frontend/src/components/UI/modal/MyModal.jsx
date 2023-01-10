import React from 'react';
import classes from './MyModal.module.css'
import MyButton from "../button/MyButton";

const MyModal = ({children, ...props}) => {

    return (
        <div className="modal bg-dark text-light fade" id={props.modalId} tabIndex="-1" aria-labelledby={`${props.modalId}Label`}
             aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered ">
                <div className="modal-content bg-dark border-0">
                    <div className="modal-header border-0 d-flex flex-column">
                        <h1 className="modal-title text-center w-100" id={`${props.modalId}Label`}>{props.title}</h1>
                        <h1 className="modal-title text-center w-100 lead" id={`${props.modalId}Label`}>{props.subTitle}</h1>
                        {/*<button type="button" className="btn-close" data-bs-dismiss="modal"*/}
                        {/*        aria-label="Закрыть"></button>*/}
                    </div>
                    <div className="modal-body border-0">
                        {children}
                    </div>
                    <div className="modal-footer border-0 d-flex justify-content-center flex-column">
                        {props.showConfirmButton &&
                        <MyButton color="success" type="button"  onClick={props.confirmButtonAction}>
                            {props.confirmButtonText ? props.confirmButtonText : "Подтвердить"}
                        </MyButton>}
                        <MyButton color="secondary" type="button" data-bs-dismiss="modal">Закрыть</MyButton>
                    </div>
                </div>
            </div>
        </div>
        // <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        //     <div className={classes.myModalContent} onClick={(e)=> e.stopPropagation()}>
        //         <button className={classes.closeBtn} onClick={() => setVisible(false)}>
        //             <i className="bi bi-x"></i>
        //         </button>
        //         {children}
        //     </div>
        // </div>
    );
};

export default MyModal;