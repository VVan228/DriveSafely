pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "./PDDLib.sol";

contract RaceHandler{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    mapping(address => uint) playersToRooms;
    struct OpenedRoom{
        uint id;
        uint8 playersNeeded;
        uint8 playersEntered;
        uint8 world;
        uint8 crossNum;
    }
    struct StartedRoom{
        uint numberPlayers;
        uint8 world;
        uint roomDNA;
        uint startTime;
        Answer[] answers;
        bool closed;
    }
    struct Answer{
        address player;
        bool correct;
        uint time;
    }

    uint roomsCount;

    constructor() {
        roomsCount = 1;
    }

    event RoomFull(uint roomId, uint roomDNA);
    event RoomClosed(uint roomId);

    OpenedRoom[] public openedRooms;
    mapping(uint => StartedRoom) public idToStartedRooms;

    function findRoom(uint carId) public{
        for(uint i = 0; i<openedRooms.length; i++){
            //require() car is actually owned by that user
            //require(openedRooms[i].world == car.world) check level of world with car 
            
            playersToRooms[msg.sender] = openedRooms[i].id;
            openedRooms[i].playersEntered++;
            if(openedRooms[i].playersEntered == openedRooms[i].playersNeeded){
                uint crossId = block.timestamp%10;
                uint roomDNA = PDDLib.generateRoom(crossId);
                idToStartedRooms[openedRooms[i].id] = StartedRoom(
                    openedRooms[i].playersNeeded,
                    openedRooms[i].world,
                    roomDNA, 
                    block.timestamp,
                    new Answer[](0),
                    false
                    );
                emit RoomFull(openedRooms[i].id, roomDNA);
                break;
            }
            
        }

        uint id = roomsCount++;
    }

    function getClosedRoom(uint roomId) public view returns(Answer[] memory){
        return idToStartedRooms[roomId].answers;
    }



    function commitAnswer(uint roomId, uint[] memory answer) public{
        require(playersToRooms[msg.sender]==roomId, "not your room");

        uint roomDNA = idToStartedRooms[roomId].roomDNA;
        bool right = PDDLib.isCorrectAnswer(roomDNA, answer);
        
        idToStartedRooms[roomId].answers.push(Answer(msg.sender, right, block.timestamp));

        if(idToStartedRooms[roomId].answers.length == idToStartedRooms[roomId].numberPlayers){
            emit RoomClosed(roomId);
            idToStartedRooms[roomId].closed = true;
            delete playersToRooms[msg.sender];
        }
    }
}
