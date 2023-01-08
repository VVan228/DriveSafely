// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract CarOwnership is Ownable{
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    TokenOwnership tokenOwnership;

    function init(address tokenOwnershipAddress) public onlyOwner{
        tokenOwnership = TokenOwnership(tokenOwnershipAddress);
    }

    function balanceOf(address _owner) external view returns (uint256){
        return tokenOwnership.balanceOfCars(_owner);
    }
    function ownerOf(uint256 _tokenId) external view returns (address){
        return tokenOwnership.ownerOfCar(_tokenId);
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable{
        return tokenOwnership.transferCarFrom(_from, _to, _tokenId);
    }
    function approve(address _approved, uint256 _tokenId) external payable{
        tokenOwnership.approveCar(_approved, _tokenId);
    }
}