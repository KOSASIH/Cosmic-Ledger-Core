// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDAO {
    function addMember(address member) external;
    function removeMember(address member) external;
}
