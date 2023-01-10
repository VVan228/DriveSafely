// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ChassisOwnership is ERC721, Ownable{
    TokenOwnership tokenOwnership;

    constructor() ERC721("ChassisBucks", "HBX"){}

    function init(address tokenOwnershipAddress) public onlyOwner{
        tokenOwnership = TokenOwnership(tokenOwnershipAddress);
    }

    function balanceOf(address _owner) override public view returns (uint256){
        return tokenOwnership.balanceOfChassis(_owner);
    }
    function ownerOf(uint256 _tokenId) override public view returns (address){
        return tokenOwnership.ownerOfChassis(_tokenId);
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        tokenOwnership.transferChassisFrom(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function putOnMarketplace(uint256 _tokenId, uint price) public {
        require(msg.sender == tokenOwnership.chassisToOwner(_tokenId), "chassis not your >:(");
        tokenOwnership.putChassisOnMarketplace(_tokenId, price);
        //setApprovalForAll(owner(), true);
    }

    function buyFromMarketplace(uint256 _tokenId) public payable{
        //req msg val
        //req sender!=owner
        //req price!=0
        payable(tokenOwnership.chassisToOwner(_tokenId)).transfer(msg.value);
    }

}