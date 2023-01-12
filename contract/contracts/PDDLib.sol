// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library PDDLib{


    function generateRoom(uint crossId, uint numPlayers, string memory randomStr) public view returns (uint roomDNA){
        uint randNonce = 0;
        uint mainRoad1;
        uint mainRoad2;
        uint carsDirections = 0;

        mainRoad1 = randMod(4 - crossId, crossId, randNonce, randomStr) + 1;
        randNonce++;
        mainRoad2 = (mainRoad1 + randMod(3 - crossId, crossId, randNonce, randomStr))%(4 - crossId) + 1;
        randNonce++;

        for(uint i=0; i<numPlayers; i++){
            uint carStart = randMod(4 - crossId, crossId, randNonce, randomStr) + 1;
            randNonce++;
            uint carDirection;
            if(carStart == 3){
                carDirection = crossId + randMod(3 - crossId, crossId, randNonce, randomStr) +1;
            }else{
                carDirection = randMod(3 - crossId, crossId, randNonce, randomStr)+1 ;
            }
            randNonce++;
            carsDirections = carsDirections*100 + (carDirection*10 + carStart);
        }

        roomDNA = carsDirections*1000 + mainRoad2*100 + mainRoad1*10 + crossId;

    }

    function randMod(uint _modulus,uint _crossId, uint _randNonce, string memory randStr) private pure returns(uint) {
        return uint(keccak256(abi.encodePacked(randStr, _crossId, _randNonce))) % _modulus;
    }
    function isCorrectAnswer(uint roomDNA, uint[] memory answer) public view returns (bool){
        uint crossId;
        (crossId, roomDNA) = getNextDnaValue(roomDNA);
        uint mainRoad1;
        (mainRoad1, roomDNA) = getNextDnaValue(roomDNA);
        mainRoad1--;
        uint mainRoad2;
        (mainRoad2, roomDNA) = getNextDnaValue(roomDNA);
        mainRoad2--;
        uint[30] memory carIndexToRoadIndex;
        uint[30] memory carIndexToDirection;
        uint[4][30] memory roadCarsIndices;
        uint[4] memory roadNumCars;
        uint carsDirections = roomDNA;
        for(uint i=0; i<answer.length; i++){
            uint carStart;
            (carStart, carsDirections) = getNextDnaValue(carsDirections);
            carStart=carStart-1;
            uint carEnd;
            (carEnd, carsDirections) = getNextDnaValue(carsDirections);
            carEnd=carEnd-1;
            carIndexToRoadIndex[i]=carStart;
            carIndexToDirection[i]=carEnd;
            roadCarsIndices[carStart][roadNumCars[carStart]]=i;
            roadNumCars[carStart]++;
        }
        uint[4] memory roadNextCar;
        for(uint i=0; i<answer.length; i++){
            if(answer[i] != roadCarsIndices[0][roadNextCar[0]] && answer[i] != roadCarsIndices[1][roadNextCar[1]]
            && answer[i] != roadCarsIndices[2][roadNextCar[2]] && answer[i] != roadCarsIndices[3][roadNextCar[3]])
            {
                return false;
            }
            uint myRoadIndex = carIndexToRoadIndex[answer[i]];
            if(carIndexToDirection[answer[i]] == 0){
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]==2){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2, (myRoadIndex+2)%4)){
                        return false;
                    }

                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]==1){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,( myRoadIndex+3)%4)){
                        return false;
                    }

                }
            }
            if(carIndexToDirection[answer[i]] == 1){
                if(roadNextCar[(myRoadIndex+1)%4] != roadNumCars[(myRoadIndex+1)%4]){
                    if(isMainRoad(mainRoad1, mainRoad2, myRoadIndex) && !isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+1)%4)){

                    }
                    else return false;
                }
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]==2){
                    if(!isMainRoad(mainRoad1,mainRoad2, myRoadIndex) && isMainRoad(mainRoad1, mainRoad2, (myRoadIndex+2)%4)){
                        return false;
                    }

                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]!=0){
                    if(!isMainRoad(mainRoad1, mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+3)%4)){
                        return false;
                    }

                }
            }
            if(carIndexToDirection[answer[i]] == 2){
                if(roadNextCar[(myRoadIndex+1)%4] != roadNumCars[(myRoadIndex+1)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+1)%4][roadNextCar[(myRoadIndex+1)%4]]]!=0){
                    if(isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && !isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+1)%4)){

                    }
                    else return false;
                }
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]!=2){
                    if(isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && !isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+2)%4)){
                    }
                    else return false;
                }
                if(roadNextCar[(myRoadIndex+2)%4] != roadNumCars[(myRoadIndex+2)%4] && carIndexToDirection[roadCarsIndices[(myRoadIndex+2)%4][roadNextCar[(myRoadIndex+2)%4]]]==2){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+2)%4)){
                        return false;
                    }
                }
                if(roadNextCar[(myRoadIndex+3)%4] != roadNumCars[(myRoadIndex+3)%4]  && carIndexToDirection[roadCarsIndices[(myRoadIndex+3)%4][roadNextCar[(myRoadIndex+3)%4]]]!=0){
                    if(!isMainRoad(mainRoad1,mainRoad2,myRoadIndex) && isMainRoad(mainRoad1,mainRoad2,(myRoadIndex+3)%4)){
                        return false;
                    }
                }
            }
            roadNextCar[carIndexToRoadIndex[answer[i]]]++;
        }
        return true;
    }


    function isMainRoad(uint _mainRoad1, uint _mainRoad2, uint _road) private pure returns(bool){
        return _road==_mainRoad1 || _road==_mainRoad2;
    }
    function getNextDnaValue(uint _dna) internal pure returns(uint value, uint dna){
        value = _dna % 10;
        dna = _dna / 10;
    }
}
