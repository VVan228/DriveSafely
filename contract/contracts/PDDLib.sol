// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library PDDLib{


    function generateRoom(uint crossId, uint numPlayers) public view returns (uint roomDNA){
        uint randNonce = 0;
        uint mainRoad1;
        uint mainRoad2;
        uint carsDirections = 0;

        mainRoad1 = randMod(4 - crossId, crossId, randNonce) + 1;
        randNonce++;
        mainRoad2 = (mainRoad1 + randMod(3 - crossId, crossId, randNonce))%4 + 1;
        randNonce++;

        for(uint i=0; i<numPlayers; i++){
            uint carStart = randMod(4 - crossId, crossId, randNonce) + 1;
            randNonce++;
            uint carDirection;
            if(carStart == 3){
                carDirection = crossId + randMod(3 - crossId, crossId, randNonce) +1;
            }else{
                carDirection = randMod(3 - crossId, crossId, randNonce)+1 ;
            }
            randNonce++;
            carsDirections = carsDirections*100 + (carDirection*10 + carStart);
        }

        roomDNA = carsDirections*1000 + mainRoad2*100 + mainRoad1*10 + crossId;

    }

    function randMod(uint _modulus,uint _crossId, uint _randNonce) private pure returns(uint) {
        return uint(keccak256(abi.encodePacked(_crossId, _randNonce))) % _modulus;
    }
    function isCorrectAnswer(uint roomDNA, uint[] memory answer) public view returns (bool){
        uint crossId;
        (crossId, roomDNA) = getNextDnaValue(roomDNA);
        uint mainRoad1;
        (mainRoad1, roomDNA) = getNextDnaValue(roomDNA);
        uint mainRoad2;
        (mainRoad2, roomDNA) = getNextDnaValue(roomDNA);
        uint[30] carIndexToRoadIndex;
        uint[30] carIndexToDirection;
        uint[4][30] roadCarsIndices;
        uint[4] roadNumCars;
        uint carsDirections = roomDNA;
        for(uint i=0; i<answer.length; i++){
            uint carStart;
            (carStart, carsDirections) = getNextDnaValue(carsDirections);
            uint carEnd;
            (carEnd, carsDirections) = getNextDnaValue(carsDirections);
            carIndexToRoadIndex[i]=carStart;
            carIndexToDirection[i]=carEnd;
            roadCarsIndices[carStart][roadNumCars[carStart]]=i;
            roadNumCars[carStart]++;
        }
        uint[4] roadNextCar;
        for(uint i=0; i<answer.length; i++){
            if(answer[i] != roadCarsIndices[0][roadNextCar[0]] && answer[i] != roadCarsIndices[1][roadNextCar[1]]
            && answer[i] != roadCarsIndices[2][roadNextCar[2]] && answer[i] != roadCarsIndices[3][roadNextCar[3]])
            {
                return false;
            }
            uint myRoadIndex = carIndexToRoadIndex[answer[i]];
            if(carIndexToDirection[answer[i]] == 1){
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]==3){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad((mainRoad1,mainRoad2, myRoadIndex+2)%4)){
                        return false;
                    }
                    continue;
                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]==2){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,( myRoadIndex+3)%4)){
                        return false;
                    }
                    continue;
                }
            }
            if(carIndexToDirection[answer[i]] == 2){
                if(roadNextCar[(myRoadIndex+1)%4] != roadNumCars[(myRoadIndex+1)%4]){
                    if(isMainRoad(mainRoad1, mainRoad2, myRoadIndex) && !isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+1)%4)){
                        continue;
                    }
                    return false;
                }
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]==3){
                    if(!isMainRoad(mainRoad1,mainRoad2, myRoadIndex) && isMainRoad(mainRoad1, mainRoad2, (myRoadIndex+2)%4)){
                        return false;
                    }
                    continue;
                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]!=1){
                    if(!isMainRoad(mainRoad1, mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+3)%4)){
                        return false;
                    }
                    continue;
                }
            }
            if(carIndexToDirection[answer[i]] == 3){
                if(roadNextCar[(myRoadIndex+1)%4] != roadNumCars[(myRoadIndex+1)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+1)%4][roadNextCar[(myRoadIndex+1)%4]]]!=1){
                    if(isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && !isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+1)%4)){
                        continue;
                    }
                    return false;
                }
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4]){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+2)%4)){
                        return false;
                    }
                    continue;
                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4]  && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]!=1){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+3)%4)){
                        return false;
                    }
                    continue;
                }
            }
            roadNextCar[carIndexToRoadIndex[answer[i]]]++;
        }
        return true;
    }


    function isMainRoad(uint _mainRoad1, uint _mainRoad2, uint _road) private pure returns(bool){
        return _road==_mainRoad1 || _road==_mainRoad2;
    }
    function getNextDnaValue(uint _dna) internal returns(uint value, uint dna){
        value = _dna % 10;
        dna = _dna / 10;
    }
}
