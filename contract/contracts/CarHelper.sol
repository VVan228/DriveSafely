// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarFactory.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

/// @title cars
contract CarHelper is CarFactory {

    uint capacityCoef = 0.00001 ether;
    uint productionPerHourCoef = 0.0002 ether;
    uint horsePowersCoef = 0.000015 ether;
    uint consumtionCoef = 0.005 ether;
    uint durabilityCoef = 0.0000000001 ether;
    uint levelUpCost = 0.001 ether;

    /// caller is equal car owner
    modifier onlyOwnerOfCar(uint _carId) {
        require(msg.sender == carToOwner[_carId]);
        _;
    }

    /// caller is equal engine owner
    modifier onlyOwnerOfEngine(uint _engineId) {
        require(msg.sender == engineToOwner[_engineId]);
        _;
    }

    /// caller is equal chassis owner
    modifier onlyOwnerOfChassis(uint _chassisId) {
        require(msg.sender == chassisToOwner[_chassisId], "chassis not your >:(");
        _;
    }

    /// caller is equal fuel station owner
    modifier onlyOwnerOfFuelStation(uint _fuelStationId) {
        require(msg.sender == fuelStationToOwner[_fuelStationId]);
        _;
    }

    /// changing engine in owner's car
    /// @param carId car id
    /// @param engineId engine id
    function switchEngine(uint carId, uint engineId) public onlyOwnerOfEngine(engineId) onlyOwnerOfCar(carId){
        require(cars[carId].engineId != engineId, "same engine");
        Car[] memory cc = getCarsByOwner(msg.sender);
        for(uint i = 0; i<cc.length; i++){
            if(cc[i].engineId == engineId){
                cc[i].engineId = 0;
            }
        }
        cars[carId].engineId = engineId;
    }

    /// changing chassis in owner's car
    /// @param carId car id
    /// @param chassisId chassis id
    function switchChassis(uint carId, uint chassisId) public onlyOwnerOfChassis(chassisId) onlyOwnerOfCar(carId){
        require(cars[carId].chassisId != chassisId, "same chassis");
        Car[] memory cc = getCarsByOwner(msg.sender);
        for(uint i = 0; i<cc.length; i++){
            if(cc[i].chassisId == chassisId){
                cc[i].chassisId = 0;
            }
        }
        cars[carId].chassisId = chassisId;
    }

    /// removal of the old engine
    /// @param carId car id
    /// @param engineId engine id
    /// @dev for installation new engine
    function detachEngine(uint carId, uint engineId) public onlyOwnerOfEngine(engineId) onlyOwnerOfCar(carId){
        require(cars[carId].engineId == engineId, "engine is not attached");
        cars[carId].engineId = 0;
    }

    /// removal of the old chassis
    /// @param carId car id
    /// @param chassisId chassis id
    /// @dev for installation new chassis
    function detachChassis(uint carId, uint chassisId) public onlyOwnerOfChassis(chassisId) onlyOwnerOfCar(carId){
        require(cars[carId].chassisId == chassisId, "chassis are not attached");
        cars[carId].chassisId = 0;
    }

    /// fuel station of owner
    /// @param _owner owner's address
    /// @return FuelStation memory one owner fuel station
    /// @dev exist only one
    function getFuelStationByOwner(address _owner) public view returns(FuelStation memory){
        uint resId;
        for (uint i = 0; i < stations.length; i++) {
            if (fuelStationToOwner[i] == _owner) {
               resId = i;
               break;
            }
        }
        return stations[resId];
    }

    /// list of owner engines
    /// @param _owner owner's address
    /// @return Engine[] memory owner's list of engines
    function getEnginesByOwner(address _owner) public view returns(Engine[] memory) {
        Engine[] memory result = new Engine[](ownerEngineCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < engines.length; i++) {
            if (engineToOwner[i] == _owner) {
                result[counter] = engines[i];
                counter++;
            }
        }
        return result;
    }

    /// list of owner chassis
    /// @param _owner owner's address
    /// @return Chassis[] memory owner's list of chassis
    function getChassisByOwner(address _owner) public view returns(Chassis[] memory) {
        Chassis[] memory result = new Chassis[](ownerChassisCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < chassis.length; i++) {
            if (chassisToOwner[i] == _owner) {
                result[counter] = chassis[i];
                counter++;
            }
        }
        return result;
    }

    /// list of owner cars
    /// @param _owner owner's address
    /// @return Car[] memory owner's list of cars
    function getCarsByOwner(address _owner) public view returns(Car[] memory) {
        Car[] memory result = new Car[](ownerCarCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < cars.length; i++) {
            if (carToOwner[i] == _owner) {
                result[counter] = cars[i];
                counter++;
            }
        }
        return result;
    }

    /// upgrade capacity of fuel station
    /// @param _fuelStatonId fuel station id
    /// @param _counts size
    function upgradeCapacity(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == getCapacityUpgradeCost(_fuelStatonId, _counts), "wrong cost");
        payable(owner()).transfer(msg.value);
        stations[_fuelStatonId].capacity += _counts; 
    }
    
    /// upgrade production on per hour
    /// @param _fuelStatonId fuel station id
    /// @param _counts size
    function upgradeProductionPerHour(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == getProductionPerHourUpgradeCost(_fuelStatonId, _counts), "wrong cost");
        payable(owner()).transfer(msg.value);
        stations[_fuelStatonId].productionPerHour += _counts; 
    }

    /// upgrade horse powers
    /// @param _engineId engine id
    /// @param _counts size
    function upgradeHorsePowers(uint _engineId, uint8 _counts) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == getHorsePowersUpgradeCost(_engineId, _counts), "wrong cost");
        payable(owner()).transfer(msg.value);
        engines[_engineId].horsePowers += _counts; 
    }

    /// upgrade consumption
    /// @param _engineId engine id
    function upgradeConsumtion(uint _engineId) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == getConsumtionUpgradeCost(_engineId), "wrong cost");
        payable(owner()).transfer(msg.value);
        engines[_engineId].consumtion --; 
    }

    /// upgrade durability
    /// @param _chassisId chassis id
    /// @param _counts size
    function upgradeDurability(uint _chassisId, uint8 _counts) external payable onlyOwnerOfChassis(_chassisId) {
        require(msg.value == getDurabilityUpgradeCost(_chassisId, _counts),  "wrong cost");
        payable(owner()).transfer(msg.value);
        chassis[_chassisId].durability += _counts; 
    }

    /// 
    function getCapacityUpgradeCost(uint _fuelStatonId, uint8 _counts) public view returns(uint){
        return (uint(_counts) * uint(stations[_fuelStatonId].capacity)) * capacityCoef;
    }

    function getProductionPerHourUpgradeCost(uint _fuelStatonId, uint8 _counts) public view returns(uint){
        return (uint(_counts) * uint(stations[_fuelStatonId].productionPerHour)) * productionPerHourCoef;
    }

    function getHorsePowersUpgradeCost(uint _engineId, uint8 _counts) public view returns(uint){
        return (uint(_counts) * uint(engines[_engineId].horsePowers)) * horsePowersCoef;
    }

    function getConsumtionUpgradeCost(uint _engineId) public view returns(uint){
        return uint(2 ** uint(10 - engines[_engineId].consumtion)) * consumtionCoef;
    }

    function getDurabilityUpgradeCost(uint _chassisId, uint8 _counts) public view returns(uint){
        return (uint(_counts) * uint(chassis[_chassisId].durability)) * durabilityCoef;
    }
    
    /// upgrade car level
    /// @param _carId car id
    function levelUp(uint _carId) external payable {
        require(msg.value == getLevelUpCost(_carId), "wrong cost");
        //require(cars[_carId].winCountOnCurrentLevel >= (cars[_carId].carLevel + 1), "not enough wins on current level!");
        payable(owner()).transfer(msg.value);
        cars[_carId].carLevel++;
        cars[_carId].winCountOnCurrentLevel = 0;
        cars[_carId].lossCountOnCurrentLevel = 0;
    }

    function getLevelUpCost(uint _carId) public view returns(uint) {
        return levelUpCost * (cars[_carId].carLevel/10 + 1);
    }

}
