// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarRacing.sol";

contract TokenOwnership is CarRacing{


    address chassisOwnership;
    address engineOwnership;
    address carOwnership;

    function init(address _chassisOwnership, address _engineOwnership, address _carOwnership) public onlyOwner{
        chassisOwnership = _chassisOwnership;
        engineOwnership = _engineOwnership;
        carOwnership = _carOwnership;
    }

    function balanceOfCars(address _owner) external view returns (uint256) {
        return ownerCarCount[_owner];
    }
    function ownerOfCar(uint256 _tokenId) external view returns(address) {
        return carToOwner[_tokenId];
    }
    function _transferCar(address _from, address _to, uint256 _tokenId) private {
        require(ownerCarCount[_from]>0, "it is your last car");
        if(cars[_tokenId].chassisId != 0){
            cars[_tokenId].chassisId = 0;
        }
        if(cars[_tokenId].engineId != 0){
            cars[_tokenId].engineId = 0;
        }
        ownerCarCount[_to]++;// = ownerCarCount[_to].add(1);
        ownerCarCount[_from]--;// = ownerCarCount[_from].sub(1);
        carToOwner[_tokenId] = _to;
    }
    function transferCarFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(msg.sender == carOwnership, "you are not car ownership");
        require (carToOwner[_tokenId] == _from || carToPrice[_tokenId] != 0);
        _transferCar(_from, _to, _tokenId);
    }


    function balanceOfEngines(address _owner) external view returns (uint256) {
        return ownerEngineCount[_owner];
    }
    function ownerOfEngine(uint256 _tokenId) external view returns(address) {
        return engineToOwner[_tokenId];
    }
    function _transferEngine(address _from, address _to, uint256 _tokenId) private {
        Car[] memory cars = getCarsByOwner(_from);
        
        for(uint i = 0; i<cars.length; i++){
            if(cars[i].engineId == _tokenId){
                cars[i].engineId = 0;
            }
        }
        ownerEngineCount[_to]++;// = ownerEngineCount[_to].add(1);
        ownerEngineCount[_from]--;// = ownerEngineCount[_from].sub(1);
        engineToOwner[_tokenId] = _to;
    }
    function transferEngineFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(msg.sender == engineOwnership, "you are not engine ownership");
        require (engineToOwner[_tokenId] == _from);
        _transferEngine(_from, _to, _tokenId);
    }

    
    function balanceOfChassis(address _owner) external view returns (uint256) {
        return ownerChassisCount[_owner];
    }
    function ownerOfChassis(uint256 _tokenId) external view returns(address) {
        return chassisToOwner[_tokenId];
    }
    function _transferChassis(address _from, address _to, uint256 _tokenId) private {
        ownerChassisCount[_to]++;// = ownerChassisCount[_to].add(1);
        ownerChassisCount[_from]--;// = ownerChassisCount[_from].sub(1);
        Car[] memory cars = getCarsByOwner(_from);
        for(uint i = 0; i<cars.length; i++){
            if(cars[i].chassisId == _tokenId){
                cars[i].chassisId = 0;
            }
        }
        chassisToOwner[_tokenId] = _to;
    }
    function transferChassisFrom(address _from, address _to, uint256 _tokenId) external {
        require(msg.sender == chassisOwnership, "you are not chassis ownership");
        require (chassisToOwner[_tokenId] == _from);
        _transferChassis(_from, _to, _tokenId);
    }


    function putChassisOnMarketplace(uint chassisId, uint price) public onlyOwnerOfChassis(chassisId){
        require(price>0, "invalid price");
        if(chassisToPrice[chassisId]==0){
            chassisForSaleCount++;
        }
        chassisToPrice[chassisId] = price;
    }
    function removeChassisFromMarketplace(uint chassisId) public onlyOwnerOfChassis(chassisId){
        if(chassisToPrice[chassisId]!=0){
            chassisForSaleCount--;
        }
        chassisToPrice[chassisId] = 0;
    }

    function putEngineOnMarketplace(uint engineId, uint price) public onlyOwnerOfEngine(engineId){
        require(price>0, "invalid price");
        if(engineToPrice[engineId]==0){
            enginesForSaleCount++;
        }
        engineToPrice[engineId] = price;
    }
    function removeEngineFromMarketplace(uint engineId) public onlyOwnerOfEngine(engineId){
        if(engineToPrice[engineId]!=0){
            enginesForSaleCount--;
        }
        engineToPrice[engineId] = 0;
    }

    function putCarOnMarketplace(uint carId, uint price) public onlyOwnerOfCar(carId){
        require(price>0, "invalid price");
        if(carToPrice[carId]==0){
            carsForSaleCount++;
        }
        carToPrice[carId] = price;
    }
    function removeCarFromMarketplace(uint carId) public onlyOwnerOfCar(carId){
        if(carToPrice[carId]!=0){
            carsForSaleCount--;
        }
        carToPrice[carId] = 0;
    }


    function getCarsForSale() public view returns(Car[] memory){
        Car[] memory res = new Car[](carsForSaleCount);
        uint c = 0;
        for(uint i = 0; i<cars.length; i++){
            if(carToPrice[i]!=0){
                res[c++] = cars[i];
            }
        }
        return res;
    }

    function getEnginesForSale() public view returns(Engine[] memory){
        Engine[] memory res = new Engine[](enginesForSaleCount);
        uint c = 0;
        for(uint i = 0; i<engines.length; i++){
            if(engineToPrice[i]!=0){
                res[c++] = engines[i];
            }
        }
        return res;
    }

    function getChassisForSale() public view returns(Chassis[] memory){
        Chassis[] memory res = new Chassis[](chassisForSaleCount);
        uint c = 0;
        for(uint i = 0; i<chassis.length; i++){
            if(chassisToPrice[i]!=0){
                res[c++] = chassis[i];
            }
        }
        return res;
    }

}