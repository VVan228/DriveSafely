// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./CarRacing.sol";

/// @title token owner
contract TokenOwnership is CarRacing{

    mapping (uint => address) public carApprovals;
    mapping (uint => address) public engineApprovals;
    mapping (uint => address) public chassisApprovals;

    /// @notice number of user cars
    /// @param _owner owner address
    /// @return uint256 number of cars
    function balanceOfCars(address _owner) external view returns (uint256) {
        return ownerCarCount[_owner];
    }

    /// @notice car owner
    /// @param _tokenId car id token
    /// @return address owner adress
    function ownerOfCar(uint256 _tokenId) external view returns(address) {
        return carToOwner[_tokenId];
    }

    /// @notice car token transfer
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId car id token
    /// @dev the car is sold disassembled (without chassis and engine), chassis and engine remain with the sender
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

    /// @notice moving car after payment
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId token id
    /// @dev call function for moving car after payment
    function transferCarFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (carToOwner[_tokenId] == _from || carToPrice[_tokenId] != 0);
        _transferCar(_from, _to, _tokenId);
    }

    /// @notice approvement car
    /// @param _approved approve address
    /// @param _tokenId token id
    /// @dev approve after payment
    function approveCar(address _approved, uint256 _tokenId) external payable onlyOwnerOfCar(_tokenId) {
        carApprovals[_tokenId] = _approved;
    }

    /// @notice number of user engines
    /// @param _owner owner address
    /// @return uint256 number of owner engine
    function balanceOfEngines(address _owner) external view returns (uint256) {
        return ownerEngineCount[_owner];
    }

    /// @notice owner of engine
    /// @param _tokenId token id
    /// @return address owner address
    function ownerOfEngine(uint256 _tokenId) external view returns(address) {
        return engineToOwner[_tokenId];
    }

    /// @notice engine token transfer
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId engine id token
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

    /// @notice moving engine from sender
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId engine id token
    /// @dev call function for moving engine from sender after payment
    function transferEngineFrom(address _from, address _to, uint256 _tokenId) external payable {
        require (engineToOwner[_tokenId] == _from);
        _transferEngine(_from, _to, _tokenId);
    }

    /// @notice approvement engine
    /// @param _approved approve address
    /// @param _tokenId token id
    /// @dev approve engine after payment
    function approveEngine(address _approved, uint256 _tokenId) external payable onlyOwnerOfEngine(_tokenId) {
        engineApprovals[_tokenId] = _approved;
    }

    /// @notice number of user chassis
    /// @param _owner owner address
    /// @return uint256 number of owner chassis
    function balanceOfChassis(address _owner) external view returns (uint256) {
        return ownerChassisCount[_owner];
    }

    /// @notice chassis owner
    /// @param _tokenId chassis id token
    /// @return address owner adress
    function ownerOfChassis(uint256 _tokenId) external view returns(address) {
        return chassisToOwner[_tokenId];
    }

    /// @notice transfer chassis
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId chassis id token
    /// @dev add chassis to recipient
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

    /// @notice moving chassis after payment
    /// @param _from sender's address
    /// @param _to address of the recipient
    /// @param _tokenId token id
    /// @dev call function for moving chassis after payment
    function transferChassisFrom(address _from, address _to, uint256 _tokenId) external {
        require (chassisToOwner[_tokenId] == _from);
        _transferChassis(_from, _to, _tokenId);
    }

    /// @notice approvement chassis
    /// @param _approved approve address
    /// @param _tokenId token id
    /// @dev approve chassis after payment
    function approveChassis(address _approved, uint256 _tokenId) external payable onlyOwnerOfChassis(_tokenId) {
        chassisApprovals[_tokenId] = _approved;
    }

    /// @notice selling chassis from owner on marketplace
    /// @param chassisId chassis id
    /// @param price chassis cost
    /// @dev using only for owner chassis
    function putChassisOnMarketplace(uint chassisId, uint price) public onlyOwnerOfChassis(chassisId){

        require(price>0, "invalid price");
        chassisToPrice[chassisId] = price;
    }

    /// @notice withdraw chassis from marketplace
    /// @param chassisId chassis id
    /// @dev using only for owner chassis
    function removeChassisFromMarketplace(uint chassisId) public onlyOwnerOfChassis(chassisId){
        chassisToPrice[chassisId] = 0;
    }

    /// @notice selling engine from owner on marketplace
    /// @param engineId engine id
    /// @param price engine cost
    /// @dev using only for owner engine
    function putEngineOnMarketplace(uint engineId, uint price) public onlyOwnerOfEngine(engineId){
        require(price>0, "invalid price");
        chassisToPrice[engineId] = price;
    }

    /// @notice withdraw engine from marketplace
    /// @param engineId engine id
    /// @dev using only for owner engine
    function removeEngineFromMarketplace(uint engineId) public onlyOwnerOfEngine(engineId){
        chassisToPrice[engineId] = 0;
    }

    /// @notice selling car from owner on marketplace
    /// @param carId car id
    /// @param price car cost
    /// @dev using only for owner car
    function putCarOnMarketplace(uint carId, uint price) public onlyOwnerOfCar(carId){
        require(price>0, "invalid price");
        chassisToPrice[carId] = price;
    }

    /// @notice withdraw car from marketplace
    /// @param carId car id
    /// @dev using only for owner car
    function removeCarFromMarketplace(uint carId) public onlyOwnerOfCar(carId){
        chassisToPrice[carId] = 0;
    }

}