import DriveSafely_abi from './API/DriveSafely_abi.json'
import DriveSafely_chassis_abi from './API/DriveSafely_chassis_abi.json'
import CAR_OWNERSHIP_ABI from './API/CarOwnershipAbi.json'
import engine_OWNERSHIP_ABI from './API/EngineOwnershipAbi.json'

export default class Constants {

    static TOKEN_OWNERSHIP_ADDRESS = "0x0387cF28a877Be8E9BAF018911cb7206de2FD5D3"
    static CHASSIS_OWNERSHIP_ADDRESS = "0x74D420690eeca610EBb49F725D884e0ec59517d1"
    static ENGINE_OWNERSHIP_ADDRESS = "0xA60CB186522aA834df50CdA14fEaD848303699ed"
    static CAR_OWNERSHIP_ADDRESS = "0xaedea5327b98F5F1DD42A491f6797a39fF2813eE"
    static TOKEN_OWNERSHIP_ABI = DriveSafely_abi
    static CHASSIS_OWNERSHIP_ABI = DriveSafely_chassis_abi
    static ENGINE_OWNERSHIP_ABI = engine_OWNERSHIP_ABI
    static CAR_OWNERSHIP_ABI = CAR_OWNERSHIP_ABI

}