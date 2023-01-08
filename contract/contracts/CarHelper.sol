pragma solidity ^0.8.13;

import "./CarFactory.sol";
import "./FuelStationFactory.sol";

contract CarHelper is CarFactory, FuelStationFactory {

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
        require(msg.sender == chassisToOwner[_chassisId]);
        _;
    }

    modifier onlyOwnerOfFuelStation(uint _fuelStationId) {
        require(msg.sender == fuelStationToOwner[_fuelStationId]);
        _;
    }


    function getFuelStationByOwner(address _owner) public view returns(uint){
        uint resId;
        for (uint i = 0; i < stations.length; i++) {
            if (fuelStationToOwner[i] == _owner) {
               resId = i;
               break;
            }
        }
        return resId;
    }

    function getEnginesByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerEngineCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < engines.length; i++) {
            if (engineToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getChassisByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerEngineCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < chassis.length; i++) {
            if (chassisToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getCarsByOwner(address _owner) public view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerCarCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < chassis.length; i++) {
            if (carToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function upgradeCapacity(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == (_counts * stations[_fuelStatonId].capacity * capacityCoef));
        stations[_fuelStatonId].capacity += _counts; 
    }

    function upgradeProductionPerHour(uint _fuelStatonId, uint8 _counts) external payable onlyOwnerOfFuelStation(_fuelStatonId) {
        require(msg.value == (_counts * stations[_fuelStatonId].productionPerHour * productionPerHourCoef));
        stations[_fuelStatonId].productionPerHour += _counts; 
    }

    function upgradeHorsePowers(uint _engineId, uint8 _counts) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == (_counts * engines[_engineId].horsePowers * horsePowersCoef));
        engines[_engineId].horsePowers += _counts; 
    }

    function upgradeConsumtion(uint _engineId, uint8 _counts) external payable onlyOwnerOfEngine(_engineId) {
        require(msg.value == consumtionCoef * 2**(10 - engines[_engineId].consumtion));
        engines[_engineId].consumtion -= _counts; 
    }

    function upgradeDurability(uint _chassisId, uint8 _counts) external payable onlyOwnerOfChassis(_chassisId) {
        require(msg.value == (_counts * chassis[_chassisId].durability * durabilityCoef));
        chassis[_chassisId].durability += _counts; 
    }

    function levelUp(uint _carId) external payable {
        require(msg.value == levelUpCost * (cars[_carId].carLevel/10) && cars[_carId].winCountOnCurrentLevel >= (cars[_carId].carLevel + 1));
        cars[_carId].carLevel++;
        cars[_carId].winCountOnCurrentLevel = 0;
        cars[_carId].lossCountOnCurrentLevel = 0;
    }


}