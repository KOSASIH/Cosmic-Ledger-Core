// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO {
    IERC20 public governanceToken;
    mapping(address => bool) public members;
    uint public memberCount;

    event MemberAdded(address indexed member);
    event MemberRemoved(address indexed member);

    constructor(IERC20 _governanceToken) {
        governanceToken = _governanceToken;
    }

    function addMember(address member) external {
        require(!members[member], "Already a member");
        members[member] = true;
        memberCount++;
        emit MemberAdded(member);
    }

    function removeMember(address member) external {
        require(members[member], "Not a member");
        members[member] = false;
        memberCount--;
        emit MemberRemoved(member);
    }
}
