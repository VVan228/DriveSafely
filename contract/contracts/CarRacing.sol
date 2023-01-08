// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./RaceHandler.sol";

contract CarRacing is RaceHandler{

    function _isEnoughFuel(uint _carId, uint8 duration) private returns(bool){
        uint stationId = getFuelStationByOwner(carToOwner[_carId]);
        _refreshFuel(stationId);
        uint engineId = cars[_carId].engineId;
        uint8 liters= 1;
        if (engines[engineId].consumtion * duration >= 10)
            liters = duration * engines[engineId].consumtion / 10;

        if (stations[stationId].currentFullness >= liters) {
            stations[stationId].currentFullness -= liters;
            return true;
        }
        else
            return false;
    }

    function _refreshFuel(uint _fuelStationId) private {
        uint curTime = block.timestamp;
        uint wholeHours = (curTime - stations[_fuelStationId].lastUpdate) / 3600;
        uint8 newFullness = uint8(stations[_fuelStationId].currentFullness + wholeHours * stations[_fuelStationId].productionPerHour);
        stations[_fuelStationId].currentFullness = uint8(Math.min(stations[_fuelStationId].capacity, newFullness));
        stations[_fuelStationId].lastUpdate = curTime;
    }


    function startRace(uint _carId) external onlyOwnerOfCar(_carId) {
        uint8 durToNextCrossroad = 2 * (10 - cars[_carId].carLevel / 10);

        require(_isEnoughFuel(_carId, durToNextCrossroad) && chassis[cars[_carId].chassisId].resource >= durToNextCrossroad);
        // TODO

        chassis[cars[_carId].chassisId].resource -= durToNextCrossroad;
        cars[_carId].mileage += durToNextCrossroad;
    }

}