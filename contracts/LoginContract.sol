// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Login {
    // Mapping to track if a user is registered
    mapping(address => bool) public isRegistered;

    // Modifier to restrict access to registered users
    modifier onlyRegistered() {
        require(isRegistered[msg.sender], "You need to be a registered user");
        _;
    }

    // Event to notify when a user is registered
    event UserRegistered(address indexed userAddress);

    // Function to register a user
    function register() public {
        require(!isRegistered[msg.sender], "User already registered");
        isRegistered[msg.sender] = true;

        emit UserRegistered(msg.sender);
    }

    // Function to verify if the caller is registered
    function isUserRegistered() public view returns (bool) {
        return isRegistered[msg.sender];
    }
}
