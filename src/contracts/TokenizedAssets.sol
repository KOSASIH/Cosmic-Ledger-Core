// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenizedAssets is ERC721 {
    struct Asset {
        string name;
        string description;
        uint256 value;
    }

    mapping(uint256 => Asset) public assets;
    uint256 public assetCount;

    event AssetTokenized(uint256 indexed assetId, string name, uint256 value);

    constructor() ERC721("TokenizedAsset", "TAS") {}

    function tokenizeAsset(string memory name, string memory description, uint256 value) external {
        assetCount++;
        assets[assetCount] = Asset(name, description, value);
        _mint(msg.sender, assetCount);
        emit AssetTokenized(assetCount, name, value);
    }
}
