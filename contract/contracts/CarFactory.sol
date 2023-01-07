pragma solidity ^0.8.13;
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract CarFactory {

    uint defaultHorsePowersLow;
    uint defaultHorsePowersUp;
   
    uint defaultConsumtionLow;
    uint defaultConsumtionUp;
  
    uint defaultDurabilityLow;
    uint defaultDurabilityUp; 

    constructor() {
         defaultHorsePowersLow = 90;
         defaultHorsePowersUp = 101;
   
         defaultConsumtionLow = 18;
         defaultConsumtionUp = 21;
  
         defaultDurabilityLow = 100000;
         defaultDurabilityUp = 120001;
    }

    struct Car {
        string model;
        bytes32 vin;
        uint engineId;
        uint chassisId;
        uint8 carLevel;
        uint mileage;
        uint winCountOnCurrentLevel;
        uint lossCountOnCurrentLevel;
    }

    struct Engine {
        uint id;
        uint16 horsePowers;
        uint16 consumtion;
    }

    struct Chassis {
        uint id;
        uint32 durability;
        uint32 resource;
    }

    uint engineCounter = 0;
    uint chassisCounter = 0;

    Car[] public cars;
    Engine[] public engines;
    Chassis[] public chassis;

    mapping (uint => address) public carToOwner;
    mapping (uint => address) public engineToOwner;
    mapping (uint => address) public chassisToOwner;
    mapping (address => bool) public OwnerHasCar;

    function createCar() public {
        require(OwnerHasCar[msg.sender] == false);

        string memory model = "model"; //TODO
        string memory key = string(abi.encodePacked(model,Strings.toString(block.timestamp))); 
        bytes32 vin = keccak256(abi.encodePacked((key)));

        uint engineId = _generateDefaultEngine(); 
        uint chassisId = _generateDefaultChassis();

        uint id = cars.length;
        cars.push(Car(model, vin, engineId, chassisId, 1, 0, 0, 0));
        carToOwner[id] = msg.sender;
        OwnerHasCar[msg.sender] = true;
    }


    function _generateDefaultEngine() private returns (uint){
        uint16 randHorsePowers = (uint16)(defaultHorsePowersLow + block.timestamp % (defaultHorsePowersUp - defaultHorsePowersLow));
        uint16 randConsumtion = (uint16) (defaultConsumtionLow + block.timestamp % (defaultConsumtionUp - defaultConsumtionLow));
        uint id = engineCounter++;
        engines.push(Engine(id, randHorsePowers, randConsumtion));
        engineToOwner[id] = msg.sender;
        return id;
    }

    function _generateDefaultChassis() private returns(uint) {
        uint32 randDurability = (uint32)(defaultDurabilityLow + block.timestamp % (defaultDurabilityUp - defaultDurabilityLow));
        uint id = chassisCounter++;
        chassis.push(Chassis(id, randDurability, 0));
        chassisToOwner[id] = msg.sender;
        return id;
    }


}