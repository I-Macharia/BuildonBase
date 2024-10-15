// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TitleDeedTokenization is ERC721 {
    uint256 public nextTokenId;
    address public landTitleRegistry;

    // Mapping token ID to document hash
    mapping(uint256 => string) public tokenDocumentHashes;

    constructor(address _landTitleRegistry) ERC721("TitleDeedToken", "TDT") {
        landTitleRegistry = _landTitleRegistry;
    }

    // Function to mint a new token for a land title
    function mintToken(address to, string memory documentHash) public {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _mint(to, tokenId);
        tokenDocumentHashes[tokenId] = documentHash;
    }

    // Function to get document hash of a token
    function getDocumentHash(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenDocumentHashes[tokenId];
    }
}