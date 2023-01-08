// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract CarOwnership is ERC721, Ownable{
    TokenOwnership tokenOwnership;

    constructor() ERC721("CarBucks", "CBX"){}

    function init(address tokenOwnershipAddress) public onlyOwner{
        tokenOwnership = TokenOwnership(tokenOwnershipAddress);
    }

    function balanceOf(address _owner) override public view returns (uint256){
        return tokenOwnership.balanceOfCars(_owner);
    }
    function ownerOf(uint256 _tokenId) override public view returns (address){
        return tokenOwnership.ownerOfCar(_tokenId);
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        tokenOwnership.transferCarFrom(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }
    function approve(address _approved, uint256 _tokenId) override public{
        tokenOwnership.approveCar(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

}