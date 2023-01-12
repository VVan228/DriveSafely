import React, {useEffect, useState} from 'react';
import classes from './MyModal.module.css'
import MyButton from "../button/MyButton";

const MyModal = ({children, ...props}) => {

    const [opacity, setOpacity] = useState("0")


    useEffect(() => {
        setTimeout(()=>{setOpacity("1")}, 100)
    })

    return (
        props.isShowing ?
            <div
                style={{
                    transition: ".3s .3s",
                    opacity: opacity,
                }}
                className={[classes.myModal, "h-100 w-100 bg-dark d-flex align-items-center justify-content-center "].join(" ")}>
                <div className="text-light ">
                    <div className="bg-dark border-0 d-flex align-items-center justify-content-center flex-column">
                        <div className="border-0 d-flex flex-column">
                            <h1 className="text-center w-100"
                                id={`${props.modalId}Label`}>{props.title}</h1>
                            <span className="text-center w-100 lead"
                                id={`${props.modalId}Label`}>{props.subTitle}</span>
                            {/*<button type="button" className="btn-close" data-bs-dismiss="modal"*/}
                            {/*        aria-label="Закрыть"></button>*/}
                        </div>
                        <div className="border-0">
                            {children}
                        </div>
                        <div className="border-0 d-flex justify-content-center flex-column col align-items-center">
                            {props.showConfirmButton &&
                                <MyButton className={"col-auto"} color="success" type="button" onClick={props.confirmButtonAction}>
                                    {props.confirmButtonText ? props.confirmButtonText : "Подтвердить"}
                                </MyButton>}
                            <MyButton color="secondary" type="button" onClick={props.close}>Закрыть</MyButton>
                        </div>
                    </div>
                </div>
            </div> : null
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