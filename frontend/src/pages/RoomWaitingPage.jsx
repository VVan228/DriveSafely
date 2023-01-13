import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context";
import {ethers} from "ethers";
import ContractService from "../API/ContractService";
import Loader from "../components/UI/loader/Loader";
import {useNavigate, useParams} from "react-router-dom";

const RoomWaitingPage = () => {

    const navigate = useNavigate()
    const {tokenContract} = useContext(AuthContext)
    const params = useParams()

    useEffect(()=>{
        tokenContract.on("RoomFull", (roomId, roomDNA) => {
            let roomInfo = {
                roomId: roomId,
                roomDNA: roomDNA,
            };
            console.log(roomInfo.roomDNA, roomInfo.roomId)
            navigate(`/race/${roomInfo.roomDNA}/${roomInfo.roomId}`)
        });
        tokenContract.startRace(parseInt(params.carId))
    }, [])

    return (
        <div className={"w-100 h-100 d-flex align-items-center justify-content-center flex-column"}>
            <div className={"mb-5"}><Loader/></div>
            <h1 className={"text-muted mt-5"}>Загружаем комнату...</h1>
        </div>
    );
};

export default RoomWaitingPage;