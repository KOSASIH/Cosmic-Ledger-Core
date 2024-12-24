// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDeFiAggregator {
    function optimizeYield(address token, uint256 amount) external;
}
