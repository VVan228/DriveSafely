import TokenABI from './API/TokenOwnership.json'
import ChassisABI from './API/ChassisOwnership.json'
import CarABI from './API/CarOwnership.json'
import EbgineABI from './API/EngineOwnership.json'
import PDDABI from './API/PDDlib.json'

export default class Constants {

    static TOKEN_OWNERSHIP_ADDRESS = "0xe1D2Fe034D374897416189E6B191Df0E9829E410"
    static CHASSIS_OWNERSHIP_ADDRESS = "0xa22Bd6D9a9CF4864842D9c2C4A6e046BAc90afa0"
    static ENGINE_OWNERSHIP_ADDRESS = "0x43C79EfAF3f2398BB3bBc44788b37819119aC2fD"
    static CAR_OWNERSHIP_ADDRESS = "0xecf6aF9A2e85110b2ccf44ABf0436627d66934D0"
    static PDD_ADDRESS = "0x7a68a35231Cecf16718E52C3Ead64199020a5543"

    static TOKEN_OWNERSHIP_ABI = TokenABI
    static CHASSIS_OWNERSHIP_ABI = ChassisABI
    static ENGINE_OWNERSHIP_ABI = EbgineABI
    static CAR_OWNERSHIP_ABI = CarABI
    static PDD_ABI = PDDABI

}