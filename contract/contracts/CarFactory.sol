// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./FuelStationFactory.sol";

contract CarFactory is Ownable, FuelStationFactory {

    uint defaultHorsePowersLow;
    uint defaultHorsePowersUp;
   
    uint8 defaultConsumtion;
  
    uint defaultDurabilityLow;
    uint defaultDurabilityUp; 


    struct Car {
        string model;
        uint vin;
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
        uint8 consumtion;
    }

    struct Chassis {
        uint id;
        uint32 durability;
        uint32 resource;
    }

    uint engineCounter = 1;
    uint chassisCounter = 1;

    Car[] public cars;
    Engine[] public engines;
    Chassis[] public chassis;

    mapping (uint => address) public carToOwner;
    mapping (uint => address) public engineToOwner;
    mapping (uint => address) public chassisToOwner;

    mapping (address => uint) public ownerCarCount;
    mapping (address => uint) ownerEngineCount;
    mapping (address => uint) ownerChassisCount;


    constructor() {
         defaultHorsePowersLow = 80;
         defaultHorsePowersUp = 91;
   
         defaultConsumtion = 10;
  
         defaultDurabilityLow = 100000;
         defaultDurabilityUp = 120001;
         engines.push();
         chassis.push();
    }

    function createCar(string memory model) public {
        require(ownerCarCount[msg.sender] == 0);

        //string memory model = "model"; //TODO
        string memory key = string(abi.encodePacked(model,Strings.toString(block.timestamp))); 
        uint vin = uint(keccak256(abi.encodePacked((key))));

        uint engineId = _generateDefaultEngine(); 
        uint chassisId = _generateDefaultChassis();

        uint id = cars.length;
        cars.push(Car(model, vin, engineId, chassisId, 1, 0, 0, 0));
        carToOwner[id] = msg.sender;
        ownerCarCount[msg.sender]++;
    }


    function _generateDefaultEngine() private returns (uint){
        uint16 randHorsePowers = (uint16)(defaultHorsePowersLow + block.timestamp % (defaultHorsePowersUp - defaultHorsePowersLow));
        // uint16 randConsumtion = (uint16) (defaultConsumtionLow + block.timestamp % (defaultConsumtionUp - defaultConsumtionLow));
        uint id = engineCounter++;
        engines.push(Engine(id, randHorsePowers, defaultConsumtion));
        ownerEngineCount[msg.sender]++;
        engineToOwner[id] = msg.sender;
        return id;
    }

    function _generateDefaultChassis() private returns(uint) {
        uint32 randDurability = (uint32)(defaultDurabilityLow + block.timestamp % (defaultDurabilityUp - defaultDurabilityLow));
        uint id = chassisCounter++;
        chassis.push(Chassis(id, randDurability, randDurability));
        ownerChassisCount[msg.sender]++;
        chassisToOwner[id] = msg.sender;
        return id;
    }


}