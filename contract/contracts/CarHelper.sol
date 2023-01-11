// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarFactory.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";


contract CarHelper is CarFactory {

    uint capacityCoef = 0.00001 ether;
    uint productionPerHourCoef = 0.0002 ether;
    uint horsePowersCoef = 0.000015 ether;
    uint consumtionCoef = 0.005 ether;
    uint durabilityCoef = 0.0000000001 ether;
    uint levelUpCost = 0.001 ether;

    modifier onlyOwnerOfCar(uint _carId) {
        require(msg.sender == carToOwner[_carId]);
        _;
    }

    modifier onlyOwnerOfEngine(uint _engineId) {
        require(msg.sender == engineToOwner[_engineId]);
        _;
    }

    modifier onlyOwnerOfChassis(uint _chassisId) {
        require(msg.sender == chassisToOwner[_chassisId], "chassis not your >:(");
        _;
    }

    modifier onlyOwnerOfFuelStation(uint _fuelStationId) {
        require(msg.sender == fuelStationToOwner[_fuelStationId]);
        _;
    }

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

    function detachEngine(uint carId, uint engineId) public onlyOwnerOfEngine(engineId) onlyOwnerOfCar(carId){
        require(cars[carId].engineId == engineId, "engine is not attached");
        cars[carId].engineId = 0;
    }
    function detachChassis(uint carId, uint chassisId) public onlyOwnerOfChassis(chassisId) onlyOwnerOfCar(carId){
        require(cars[carId].chassisId == chassisId, "chassis are not attached");
        cars[carId].chassisId = 0;
    }


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

    function upgradeCapacity(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == (_counts * stations[_fuelStatonId].capacity * capacityCoef));
        payable(owner()).transfer(msg.value);
        stations[_fuelStatonId].capacity += _counts; 
    }

    function upgradeProductionPerHour(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == (_counts * stations[_fuelStatonId].productionPerHour * productionPerHourCoef));
        payable(owner()).transfer(msg.value);
        stations[_fuelStatonId].productionPerHour += _counts; 
    }

    function upgradeHorsePowers(uint _engineId, uint8 _counts) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == (_counts * engines[_engineId].horsePowers * horsePowersCoef));
        payable(owner()).transfer(msg.value);
        engines[_engineId].horsePowers += _counts; 
    }

    function upgradeConsumtion(uint _engineId, uint8 _counts) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == consumtionCoef * 2**(10 - engines[_engineId].consumtion));
        payable(owner()).transfer(msg.value);
        engines[_engineId].consumtion -= _counts; 
    }

    function upgradeDurability(uint _chassisId, uint8 _counts) external payable onlyOwnerOfChassis(_chassisId) {
        require(msg.value == (_counts * chassis[_chassisId].durability * durabilityCoef));
        payable(owner()).transfer(msg.value);
        chassis[_chassisId].durability += _counts; 
    }

    function levelUp(uint _carId) external payable {
        uint r = levelUpCost * (cars[_carId].carLevel/10 + 1);
        require(msg.value == r, "wrong cost");
        //require(cars[_carId].winCountOnCurrentLevel >= (cars[_carId].carLevel + 1), "level is");
        payable(owner()).transfer(msg.value);
        cars[_carId].carLevel++;
        cars[_carId].winCountOnCurrentLevel = 0;
        cars[_carId].lossCountOnCurrentLevel = 0;
    }

}
