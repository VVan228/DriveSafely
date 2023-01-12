// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./PDDLib.sol";

contract PDDLibTest{
    function commitAnswerTest(uint roomDNA, uint[] memory answer) public returns(bool){
        bool right = PDDLib.isCorrectAnswer(roomDNA, answer);
        return right;
    }
    function generateRoom(uint crossId, uint numPlayers, string memory randomStr) public view returns(uint){
        return PDDLib.generateRoom(crossId, numPlayers, randomStr);
    }
}
