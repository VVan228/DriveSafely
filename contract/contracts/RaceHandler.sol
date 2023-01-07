pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract RaceHandler{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct OpenedRoom{
        uint id;
        address[] players;
        uint8 playersNeeded;
        uint8 world;
        uint8 crossNum;
    }
    struct StartedRoom{
        uint id;
        address[] players;
        uint8 world;
        uint roomDNA;
        uint startTime;
    }

    uint roomsCount;

    constructor() {
        roomsCount = 1;
    }

    event RoomFull(uint roomId, uint roomDNA);

    OpenedRoom[] public openedRooms;
    StartedRoom[] public startedRooms;

    function findRoom(uint carId) public{
        for(uint i = 0; i<openedRooms.length; i++){
            //require() car is actually owned by that user
            //if(openedRooms[i].world ){} check level of world with car 
            
            openedRooms[i].players.push(msg.sender);
            if(openedRooms[i].players.length == openedRooms[i].playersNeeded){
                //roomDNA get
                uint roomDNA = 50;
                uint id = roomsCount++;
                startedRooms.push(StartedRoom(id, openedRooms[i].players, openedRooms[i].world, roomDNA, block.timestamp));
                emit RoomFull(id, roomDNA);
                break;
            }
            
        }
    }
}
