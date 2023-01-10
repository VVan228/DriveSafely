// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarRacing.sol";

contract TokenOwnership is CarRacing{

    mapping (uint => address) carApprovals;
    mapping (uint => address) engineApprovals;
    mapping (uint => address) chassisApprovals;


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
        require (carToOwner[_tokenId] == _from || carToPrice[_tokenId] != 0);
        _transferCar(_from, _to, _tokenId);
    }
    function approveCar(address _approved, uint256 _tokenId) external payable onlyOwnerOfCar(_tokenId) {
        carApprovals[_tokenId] = _approved;
    }


    function balanceOfEngines(address _owner) external view returns (uint256) {
        return ownerEngineCount[_owner];
    }
    function ownerOfEngine(uint256 _tokenId) external view returns(address) {
        return engineToOwner[_tokenId];
    }
    function _transferEngine(address _from, address _to, uint256 _tokenId) private {
        Car[] memory carr = getCarsByOwner(_from);
        bool flag = false;
        if(carr.length>0){
            for(uint i = 0; i<carr.length; i++){
                if(carr[i].engineId == _tokenId){
                    detachEngine(carr[i].id, carr[i].engineId);
                }
            }
            require(!flag, "engine not erased");
        }

        ownerEngineCount[_to]++;// = ownerEngineCount[_to].add(1);
        ownerEngineCount[_from]--;// = ownerEngineCount[_from].sub(1);
        engineToOwner[_tokenId] = _to;
    }
    function transferEngineFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (engineToOwner[_tokenId] == _from || engineApprovals[_tokenId] == msg.sender);
        _transferEngine(_from, _to, _tokenId);
    }
    function approveEngine(address _approved, uint256 _tokenId) external payable onlyOwnerOfEngine(_tokenId) {
        engineApprovals[_tokenId] = _approved;
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
    function transferChassisFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (chassisToOwner[_tokenId] == _from || chassisApprovals[_tokenId] == msg.sender);
        _transferChassis(_from, _to, _tokenId);
    }
    function approveChassis(address _approved, uint256 _tokenId) external payable onlyOwnerOfChassis(_tokenId) {
        chassisApprovals[_tokenId] = _approved;
    }


    function putChassisOnMarketplace(uint chassisId, uint price) public onlyOwnerOfChassis(chassisId){

        require(price>0, "invalid price");
        chassisToPrice[chassisId] = price;
    }
    function removeChassisFromMarketplace(uint chassisId) public onlyOwnerOfChassis(chassisId){
        chassisToPrice[chassisId] = 0;
    }

    function putEngineOnMarketplace(uint engineId, uint price) public onlyOwnerOfEngine(engineId){
        require(price>0, "invalid price");
        chassisToPrice[engineId] = price;
    }
    function removeEngineFromMarketplace(uint engineId) public onlyOwnerOfEngine(engineId){
        chassisToPrice[engineId] = 0;
    }

    function putCarOnMarketplace(uint carId, uint price) public onlyOwnerOfCar(carId){
        require(price>0, "invalid price");
        chassisToPrice[carId] = price;
    }
    function removeCarFromMarketplace(uint carId) public onlyOwnerOfCar(carId){
        chassisToPrice[carId] = 0;
    }

}