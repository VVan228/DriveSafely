// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./TokenOwnership.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title car's owner
contract CarOwnership is ERC721, Ownable{
    TokenOwnership tokenOwnership;
    mapping (uint => address) public carApprovals;


    constructor() ERC721("CarBucks", "CBX"){}

    function init(address tokenOwnershipAddress) public onlyOwner{
        tokenOwnership = TokenOwnership(tokenOwnershipAddress);
    }

    /// number of owner cars
    /// @param _owner owner address
    /// @return number of cars
    function balanceOf(address _owner) override public view returns (uint256){
        return tokenOwnership.balanceOfCars(_owner);
    }

    /// get owner
    /// @param _tokenId token id
    /// @return address owner address
    function ownerOf(uint256 _tokenId) override public view returns (address){
        return tokenOwnership.ownerOfCar(_tokenId);
    }

    /// get approved
    /// @param _tokenId token id
    /// @return address owner address
     function getApproved(uint256 _tokenId) override public view returns(address) {
        return carApprovals[_tokenId];
    }

    /// transfer token
    /// @param _from address sender
    /// @param _to addres recipier
    /// @param _tokenId token id
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        require(getApproved(_tokenId) == _to, "you didn't pay for the token!");
        tokenOwnership.transferCarFrom(_from, _to, _tokenId);
        emit Transfer(_from, _to, _tokenId);
        carApprovals[_tokenId] = address(0);
    }

    /// buying token from marketplace
    /// @param _tokenId token id
    function buyFromMarketplace(uint256 _tokenId) public payable{
        require(tokenOwnership.carToPrice(_tokenId)!=0, "not for sale!");
        require(msg.value == tokenOwnership.carToPrice(_tokenId), "val wrong");
        require(ownerOf(_tokenId) != msg.sender, "cant buy yours");

        approveDeal(msg.sender, _tokenId);
        emit Approval(ownerOf(_tokenId), msg.sender, _tokenId);

        payable(ownerOf(_tokenId)).transfer(msg.value);
        transferFrom(ownerOf(_tokenId), msg.sender, _tokenId);
    }
    
    /// confirmation of money for a token
    /// @dev permission for sending token
    function approveDeal(address to, uint tokenId) private{
        carApprovals[tokenId] = to;
    }
}