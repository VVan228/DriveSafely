// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library PDDLib{
function generateRoom(uint crossId, uint numPlayers) public view returns (uint roomDNA){
    uint randNonce = 0;
    uint mainRoad1;
    uint mainRoad2;
    uint carsDirections = 0;
    uint testCommit = 10;

    mainRoad1 = randMod(4 - crossId, crossId, randNonce);
    randNonce++;
    mainRoad2 = (mainRoad1 + randMod(3 - crossId, crossId, randNonce))%4;
    randNonce++;
    for(uint i=0; i<numPlayers; i++){
        uint carStart = randMod(4 - crossId, crossId, randNonce);
        randNonce++;
        uint carDirection;
        if(carStart == 2){
            carDirection = crossId + randMod(3 - crossId, crossId, randNonce);
        }else{
            carDirection = randMod(3 - crossId, crossId, randNonce);
        }
        randNonce++;
        carsDirections = carsDirections*100 + (carDirection*10 + carStart);
    }

    roomDNA = carsDirections*1000 + mainRoad2*100 + mainRoad1*10 + crossId;

}

function randMod(uint _modulus,uint _crossId, uint _randNonce) private pure returns(uint) {
    return uint(keccak256(_crossId, randNonce)) % _modulus;
  }
function isCorrectAnswer(uint roomDNA, uint[] memory answer) public view returns (bool){
    uint crossId;
    (crossId, roomDNA) = getNextDnaValue(roomDNA);
    uint mainRoad1;
    (mainRoad1, roomDNA) = getNextDnaValue(roomDNA);
    uint mainRoad2;
    (mainRoad2, roomDNA) = getNextDnaValue(roomDNA);
    mapping(uint => uint) carIndexToRoadIndex;
    mapping(uint => uint) carIndexToDirection;
    uint[4][] roadCarsIndices;
    uint carsDirections = roomDNA;
    for(uint i=0; i<answer.length; i++){
        uint carStart;
        (carStart, carsDirections) = getNextDnaValue(carsDirections);
        uint carEnd;
        (carEnd, carsDirections) = getNextDnaValue(carsDirections);
        carIndexToRoadIndex[i]=carStart;
        carIndexToDirection[i]=carEnd;
        roadCarsIndices[carStart].push(i);
    }
    for(uint i=0; i<answer.length; i++){
        if(answer[i] != roadCarsIndices[0][0] && answer[i] != roadCarsIndices[1][0]
            && answer[i] != roadCarsIndices[2][0] && answer[i] != roadCarsIndices[3][0])
            {
                return false;
            }
        uint myRoadIndex = carIndexToRoadIndex[answer[i]];
        if(carIndexToDirection[answer[i]] == 0){
            if(roadCarsIndices[(myRoadIndex+2)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][0]]==2){
                if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+2)%4)){
                    return false;
                 }
                continue;
            }
            if(roadCarsIndices[(myRoadIndex+3)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][0]]==1){
                if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+3)%4)){
                    return false;
                 }
                continue;
            }
        }
        if(carIndexToDirection[answer[i]] == 1){
            if(roadCarsIndices[(myRoadIndex+1)%4].length != 0){
                if(isMainRoad(myRoadIndex) && !isMainRoad((myRoadIndex+1)%4)){
                    continue;
                }
                return false;
            }
            if(roadCarsIndices[(myRoadIndex+2)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][0]]==2){
                if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+2)%4)){
                    return false;
                }
                continue;
            }
            if(roadCarsIndices[(myRoadIndex+3)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][0]]!=0){
                 if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+3)%4)){
                    return false;
                }
                continue;
            }
         }
        if(carIndexToDirection[answer[i]] == 2){
            if(roadCarsIndices[(myRoadIndex+1)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+1)%4][0]]!=0){
                if(isMainRoad(myRoadIndex) && !isMainRoad((myRoadIndex+1)%4)){
                    continue;
                }
                return false;
            }
            if(roadCarsIndices[(myRoadIndex+2)%4].length != 0){
                 if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+2)%4)){
                    return false;
                }
                continue;
            }
            if(roadCarsIndices[(myRoadIndex+3)%4].length != 0 && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][0]]!=0){
                if(!isMainRoad(myRoadIndex) && isMainRoad((myRoadIndex+3)%4)){
                    return false;
                }
                continue;
            }
        }

        roadCarsIndices[myRoadIndex] = remove(roadCarsIndices[myRoadIndex], 0);
    }
return true;
}
function remove(uint[] array, uint index) private pure returns(uint[]) {
        if (index >= array.length) return;

        for (uint i = index; i<array.length-1; i++){
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.length--;
        return array;
    }
function isMainRoad(uint _mainRoad1, uint _mainRoad2, uint _road) private pure returns(bool){
    return _road==_mainRoad1 || _road==_mainRoad2;
}
function getNextDnaValue(uint _dna) internal returns(uint value, uint dna) private pure {
    value = _dna % 10;
    dna = _dna / 10;
}
}
