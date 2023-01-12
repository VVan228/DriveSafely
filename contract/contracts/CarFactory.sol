// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./FuelStationFactory.sol";

/// @title create tokens and save data
contract CarFactory is Ownable, FuelStationFactory {

    uint defaultHorsePowersLow;
    uint defaultHorsePowersUp;
   
    uint8 defaultConsumtion;
  
    uint defaultDurabilityLow;
    uint defaultDurabilityUp;


    uint public carsForSaleCount = 0;
    uint public chassisForSaleCount = 0;
    uint public enginesForSaleCount = 0;

    struct Car {
        string model;
        uint vin;
        uint engineId;
        uint chassisId;
        uint8 carLevel;
        uint mileage;
        uint winCountOnCurrentLevel;
        uint lossCountOnCurrentLevel;
        uint id;
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
    mapping (address => uint) public ownerEngineCount;
    mapping (address => uint) public ownerChassisCount;

    mapping (uint => uint) public carToPrice;
    mapping (uint => uint) public engineToPrice;
    mapping (uint => uint) public chassisToPrice;


    constructor() {
         defaultHorsePowersLow = 80;
         defaultHorsePowersUp = 91;
   
         defaultConsumtion = 10;
  
         defaultDurabilityLow = 100000;
         defaultDurabilityUp = 120001;
         engines.push();
         chassis.push();
    }

    /// creating car
    /// @param model car model
    /// @dev creating new car for user
    function createCar(string memory model) public {
        require(ownerCarCount[msg.sender] == 0);

        //string memory model = "model"; //TODO
        string memory key = string(abi.encodePacked(model,Strings.toString(block.timestamp))); 
        uint vin = uint(keccak256(abi.encodePacked((key))));

        uint engineId = _generateDefaultEngine(); 
        uint chassisId = _generateDefaultChassis();

        uint id = cars.length;
        cars.push(Car(model, vin, engineId, chassisId, 1, 0, 0, 0, id));
        
        carToOwner[id] = msg.sender;
        ownerCarCount[msg.sender]++;
    }

    /// default engine gineration создание дефолтного двигателя (при регистрации нового игрока)
    /// @return id new engine
    /// @dev new random engine
    function _generateDefaultEngine() private returns (uint){
        uint16 randHorsePowers = (uint16)(defaultHorsePowersLow + block.timestamp % (defaultHorsePowersUp - defaultHorsePowersLow));
        // uint16 randConsumtion = (uint16) (defaultConsumtionLow + block.timestamp % (defaultConsumtionUp - defaultConsumtionLow));
        uint id = engineCounter++;
        engines.push(Engine(id, randHorsePowers, defaultConsumtion));
        ownerEngineCount[msg.sender]++;
        engineToOwner[id] = msg.sender;
        return id;
    }

    /// default chassis gineration создание дефолтного шасси
    /// @return id new chassis
    /// @dev new random chassis
    function _generateDefaultChassis() private returns(uint) {
        uint32 randDurability = (uint32)(defaultDurabilityLow + block.timestamp % (defaultDurabilityUp - defaultDurabilityLow));
        uint id = chassisCounter++;
        chassis.push(Chassis(id, randDurability, randDurability));
        ownerChassisCount[msg.sender]++;
        chassisToOwner[id] = msg.sender;
        return id;
    }

    /// customer car creation для владельца контракта (для продажи токенов на маркетплейсе)
    /// @param _model car model
    /// @param _horsePowers car horse powers
    /// @param _consumtion car consumtion
    /// @param  _durability car durability
    /// @param  _carLevel car level
    /// @param  _carPrice car price
    /// @dev creation car for customer with different characteristics
    function createCustomCar(string memory _model, uint16 _horsePowers, uint8 _consumtion, uint32 _durability, uint8 _carLevel, uint _carPrice) external onlyOwner {
        string memory key = string(abi.encodePacked(_model,Strings.toString(block.timestamp)));
        uint vin = uint(keccak256(abi.encodePacked((key))));

        uint engineId = createCustomEngine(_horsePowers, _consumtion, 0);
        uint chassisId = createCustomChassis(_durability, 0);

        uint id = cars.length;
        cars.push(Car(_model, vin, engineId, chassisId, _carLevel, 0, 0, 0, id));
        carToOwner[id] = owner();
        ownerCarCount[owner()]++;
        carToPrice[id] = _carPrice;
        carsForSaleCount++;
    }

    /// customer engine creation
    /// @param _horsePowers car horse powers
    /// @param _consumtion car consumtion
    /// @param _enginePrice car engine price
    /// @return id new engine
    function createCustomEngine(uint16 _horsePowers, uint8 _consumtion, uint _enginePrice) public onlyOwner returns(uint){
        uint id = engineCounter++;
        engines.push(Engine(id, _horsePowers, _consumtion));
        ownerEngineCount[owner()]++;
        engineToOwner[id] = owner();
        if (_enginePrice > 0) {
            engineToPrice[id] = _enginePrice;
            enginesForSaleCount++;
        }
        return id;
    }

    /// customer chassis creation
    /// @param _durability car durability
    /// @param _chassisPrice chassis price
    /// @return id new chassis
    function createCustomChassis(uint32 _durability, uint _chassisPrice) public onlyOwner returns(uint){
        uint id = chassisCounter++;
        chassis.push(Chassis(id, _durability, _durability));
        ownerChassisCount[owner()]++;
        chassisToOwner[id] = owner();
        if (_chassisPrice > 0) {
            chassisToPrice[id] = _chassisPrice;
            chassisForSaleCount++;
        }
        return id;
    }

}