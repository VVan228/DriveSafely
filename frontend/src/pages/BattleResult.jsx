import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import {convertToObj} from "../utils/battleResult";
import MyButton from "../components/UI/button/MyButton";
import MyDataView from "../components/UI/dataview/MyDataView";

const BattleResult = () => {

    const {tokenContract} = useContext(AuthContext)
    const {roomID} = useParams()
    const [result, setResult] = useState([])
    const navigate = useNavigate()

    const [fetchResults, isResultsLoading, error] = useFetching(async () => {
            const response = await tokenContract.getClosedRoom(roomID)
            let answers = []
            response.map(answer => answers.push(convertToObj(answer)))
            console.log(answers)
            setResult(answers)
        }
    )

    useEffect(() => {
        fetchResults()
    }, [])

    return (
        isResultsLoading ? <Loader/> :
            <div className={"row d-flex align-items-center justify-content-evenly w-100 h-100 flex-wrap bg-dark"}>
                {result.map(answer =>
                    <div className={["card col-2 text-light m-5 border-0", answer.isCorrect === "true" ? "bg-success" : "bg-danger"].join(" ")}>
                        <span className={"h3"}>ID Машины: {answer.carId}</span>
                        <span>{answer.isCorrect === "true" ? "Правильный" : "Неправильный"} ответ</span>
                        <span>{new Date(parseInt(answer.time)).toLocaleDateString('en-US')}</span>
                        <span>{answer.playerAddress}</span>
                    </div>)}
                <div className={"col-3"}>
                    <MyButton onClick={() => {
                        navigate('/competitions')
                    }}>Выйти</MyButton>
                </div>
            </div>
    );
};

export default BattleResult;