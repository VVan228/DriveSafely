// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChassisOwnership is ERC721, Ownable {
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

    function getApproved(uint256 _tokenId) override public view returns(address) {
        return tokenOwnership.chassisApprovals(_tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        require(getApproved(_tokenId) == _to, "you didn't pay for the token!");
        tokenOwnership.transferChassisFrom(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }

    function buyFromMarketplace(uint256 _tokenId) public payable{
        require(tokenOwnership.chassisToPrice(_tokenId)!=0, "not for sale!");
        require(msg.value == tokenOwnership.chassisToPrice(_tokenId), "val wrong");
        require(ownerOf(_tokenId) != msg.sender, "cant buy yours");

        tokenOwnership.approveChassis(msg.sender, _tokenId);
        emit Approval(ownerOf(_tokenId), msg.sender, _tokenId);

        payable(ownerOf(_tokenId)).transfer(msg.value);
        transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);
    }

}