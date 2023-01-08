// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FuelStationFactory{

    uint8 defaultCapacity = 60;
    uint8 defaultProduction = 5;

	struct FuelStation{ 
        uint id;
        uint8 capacity;
        uint8 productionPerHour;
        uint8 currentFullness;
        uint lastUpdate;
    }


    FuelStation[] public stations;

    mapping (uint => address) public fuelStationToOwner;

    function createFuelStation() public{
        address ad = msg.sender;
        uint id = stations.length;
        stations.push(FuelStation(id, defaultCapacity, defaultProduction, defaultCapacity, uint32(block.timestamp)));
        fuelStationToOwner[id] = ad;
    }

}
