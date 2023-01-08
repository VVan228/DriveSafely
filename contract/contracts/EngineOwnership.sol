// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract EngineOwnership is ERC721, Ownable{
    TokenOwnership tokenOwnership;

    constructor() ERC721("EngineBucks", "EBX"){}

    function init(address tokenOwnershipAddress) public onlyOwner{
        tokenOwnership = TokenOwnership(tokenOwnershipAddress);
    }

    function balanceOf(address _owner) override public view returns (uint256){
        return tokenOwnership.balanceOfEngines(_owner);
    }
    function ownerOf(uint256 _tokenId) override public view returns (address){
        return tokenOwnership.ownerOfEngine(_tokenId);
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        tokenOwnership.transferEngineFrom(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
    }
    function approve(address _approved, uint256 _tokenId) override public{
        tokenOwnership.approveEngine(_approved, _tokenId);
        emit Approval(msg.sender, _approved, _tokenId);
    }

}