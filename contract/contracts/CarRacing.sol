// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./RaceHandler.sol";

/// @title car racing
contract CarRacing is RaceHandler{

    /// checking amount of fuel
    /// @param _carId car id
    /// @param duration duration value
    /// @return bool answer after checking
    /// @dev count fuel amount for give answer
    function _isEnoughFuel(uint _carId, uint8 duration) private returns(bool){
        FuelStation memory station = getFuelStationByOwner(carToOwner[_carId]);
        _refreshFuel(station.id);
        uint engineId = cars[_carId].engineId;
        uint8 liters= 1;
        if (engines[engineId].consumtion * duration >= 10)
            liters = duration * engines[engineId].consumtion / 10;

        if (stations[station.id].currentFullness >= liters) {
            stations[station.id].currentFullness -= liters;
            return true;
        }
        else
            return false;
    }

    /// refresh fuel
    /// @param _fuelStationId fuel station id
    function _refreshFuel(uint _fuelStationId) private {
        uint curTime = block.timestamp;
        uint wholeHours = (curTime - stations[_fuelStationId].lastUpdate) / 3600;
        uint8 newFullness = uint8(stations[_fuelStationId].currentFullness + wholeHours * stations[_fuelStationId].productionPerHour);
        stations[_fuelStationId].currentFullness = uint8(Math.min(stations[_fuelStationId].capacity, newFullness));
        stations[_fuelStationId].lastUpdate = curTime;
    }

    /// start race
    /// @param _carId car id
    function startRace(uint _carId) external onlyOwnerOfCar(_carId) {
        uint8 durToNextCrossroad = 2 * (10 - cars[_carId].carLevel / 10);

        require(playersToCars[msg.sender]==0, "car already in race");
        require(cars[_carId].chassisId!=0, "no chassis");
        require(cars[_carId].engineId!=0, "no engine");
        require(_isEnoughFuel(_carId, durToNextCrossroad), "not enough fuel");
        require(chassis[cars[_carId].chassisId].resource >= durToNextCrossroad, "resource");
        
        // TODO
        findRoom(msg.sender, _carId);

        chassis[cars[_carId].chassisId].resource -= durToNextCrossroad;
        cars[_carId].mileage += durToNextCrossroad;
    }

}