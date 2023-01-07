pragma solidity ^0.8.13;

contract FuelStationFactory{

    uint8 defaultCapacity = 60;
    uint8 defaultProduction = 5;

	struct FuelStation{
        uint id;
        uint8 capacity;
        uint8 productionPerHour;
    }

    FuelStation[] public stations;

    mapping (address => uint) public ownerToFuelStation;

    function getFuelStation() public view returns(uint, uint8, uint8){
        address ad = msg.sender;
        uint stationId = ownerToFuelStation[ad];
        require(stationId>0, "user has no fuel station???");
        require(stationId<=stations.length, "invalid id");
        FuelStation memory station = stations[stationId-1];
        return (station.id, station.capacity, station.productionPerHour);
    }

    function createFuelStation() public{
        address ad = msg.sender;
        uint stationId = ownerToFuelStation[ad];
        require(stationId==0, "user already has station");
        stations.push(FuelStation(stations.length+1, defaultCapacity, defaultProduction));
        uint id = stations.length;
        stations[id-1].id = id;
        ownerToFuelStation[ad] = id;
    }

}
