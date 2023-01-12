// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./PDDLib.sol";
import "./CarHelper.sol";
import "./CarFactory.sol";

/// @title An auxiliary contract that implements the interaction with the rooms and connects them with the functions of the main game mechanics
contract RaceHandler is CarHelper{
    struct Cross{
        uint playersNeeded;
        uint roadsNum;
        uint crossId;
    }

    Cross[] crosses;
    
    mapping(address => uint) playersToRooms;
    mapping(address => uint) playersToCars;
    struct OpenedRoom{
        uint id;
        uint playersEntered;
        uint world;
        Cross cross;
    }
    struct StartedRoom{
        uint numberPlayers;
        uint world;
        uint roomDNA;
        uint startTime;
        Answer[] answers;
        uint curAnswer;
        bool closed;
    }
    struct Answer{
        address player;
        bool correct;
        uint time;
        uint carId;
    }

    uint roomsCount;

    constructor(){
        crosses.push(Cross(4,4,0));
        crosses.push(Cross(3,4,0));
        crosses.push(Cross(2,4,0));
        crosses.push(Cross(3,3,1));
        crosses.push(Cross(2,3,1));
        roomsCount = 1;
    }

    event RoomFull(uint roomId, uint roomDNA);
    event RoomClosed(uint roomId);

    OpenedRoom[] public openedRooms;
    mapping(uint => StartedRoom) public idToStartedRooms;

    /// search room for competition
    /// @param carId car id
    /// @dev if exist appropriate room for current user, user start competition in this room, else add new room
    function findRoom(uint carId) public onlyOwnerOfCar(carId){
        bool foundRoom = false;
        for(uint i = 0; i<openedRooms.length; i++){
            if(cars[carId].carLevel/10+1 != openedRooms[i].world){
                continue;
            }
            foundRoom = true;
            playersToRooms[msg.sender] = openedRooms[i].id;
            playersToCars[msg.sender] = carId;
            openedRooms[i].playersEntered++;
            if(openedRooms[i].playersEntered == openedRooms[i].cross.playersNeeded){
                uint roomDNA = PDDLib.generateRoom(openedRooms[i].cross.crossId, openedRooms[i].cross.playersNeeded);
                
                StartedRoom storage ss = idToStartedRooms[openedRooms[i].id];
                ss.numberPlayers = openedRooms[i].cross.playersNeeded;
                ss.world = openedRooms[i].world;
                ss.roomDNA = roomDNA;
                ss.startTime = block.timestamp;
                ss.curAnswer = 0;
                ss.closed = false;

                emit RoomFull(openedRooms[i].id, roomDNA);
                delete openedRooms[i];
                break;
            }
        }

        if(foundRoom){
            return;
        }
        uint id = roomsCount++;
        uint crossNum = block.timestamp%crosses.length;
        playersToRooms[msg.sender] = id;
        openedRooms.push(OpenedRoom(
            id,
            1,
            cars[carId].carLevel/10+1,
            crosses[crossNum]
        ));
    }

    /// get closed room
    /// @param roomId room id
    /// @return Answer[] memory list with player response, player, player car and response time
    /// @dev called after receiving the event about sending the last response to the room
    function getClosedRoom(uint roomId) public view returns(Answer[] memory){
        require(idToStartedRooms[roomId].closed, "room not closed");
        return idToStartedRooms[roomId].answers;
    }

    /// commit ans
    /// @param roomId room id
    /// @param answer ?
    function commitAnswer(uint roomId, uint[] memory answer) public{
        require(playersToRooms[msg.sender]==roomId, "not your room");

        uint roomDNA = idToStartedRooms[roomId].roomDNA;
        bool right = PDDLib.isCorrectAnswer(roomDNA, answer);
        //Answer memory ans = Answer(msg.sender, right, block.timestamp);
        
        Answer memory ans = Answer(msg.sender, right, block.timestamp, playersToCars[msg.sender]);
        StartedRoom storage sr = idToStartedRooms[roomId];
        sr.answers.push(ans);

        if(idToStartedRooms[roomId].answers.length == idToStartedRooms[roomId].numberPlayers){
            emit RoomClosed(roomId);
            idToStartedRooms[roomId].closed = true;
            delete playersToRooms[msg.sender];
            delete playersToCars[msg.sender];
        }
    }
}
