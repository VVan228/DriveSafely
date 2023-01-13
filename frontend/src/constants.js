import TokenABI from './API/TokenOwnership.json'
import ChassisABI from './API/ChassisOwnership.json'
import CarABI from './API/CarOwnership.json'
import EbgineABI from './API/EngineOwnership.json'
import PDDABI from './API/PDDlib.json'

export default class Constants {

    static TOKEN_OWNERSHIP_ADDRESS = "0x34B2A7499284AeE2D8Ba6ad738ae2e23131914B3"
    static CHASSIS_OWNERSHIP_ADDRESS = "0x54156aac3b6B4f631CC028b711007316F6eD2655"
    static ENGINE_OWNERSHIP_ADDRESS = "0x6F239FA88d328B45d6446FF4F1f0CDC6708df38C"
    static CAR_OWNERSHIP_ADDRESS = "0x2153498d9e14097F6Bb0679c10B6324B52D6c9bF"
    static PDD_ADDRESS = "0x7a68a35231Cecf16718E52C3Ead64199020a5543"

    static TOKEN_OWNERSHIP_ABI = TokenABI
    static CHASSIS_OWNERSHIP_ABI = ChassisABI
    static ENGINE_OWNERSHIP_ABI = EbgineABI
    static CAR_OWNERSHIP_ABI = CarABI
    static PDD_ABI = PDDABI

}