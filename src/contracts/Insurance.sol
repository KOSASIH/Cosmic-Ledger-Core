// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    struct Policy {
        address insured;
        uint coverageAmount;
        bool isActive;
    }

    mapping(address => Policy) public policies;

    event PolicyCreated(address indexed insured, uint coverageAmount);
    event PolicyClaimed(address indexed insured, uint amount);

    function createPolicy(uint coverageAmount) external {
        policies[msg.sender] = Policy(msg.sender, coverageAmount, true);
        emit PolicyCreated(msg.sender, coverageAmount);
    }

    function claimPolicy() external {
        Policy storage policy = policies[msg.sender];
        require(policy.isActive, "Policy not active");
        // Logic to pay out claim
        emit PolicyClaimed(msg .sender, policy.coverageAmount);
        policy.isActive = false; // Mark policy as claimed
    }
}
