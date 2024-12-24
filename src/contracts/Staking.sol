// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    IERC20 public stakingToken;
    mapping(address => uint) public stakedAmount;
    mapping(address => uint) public rewards;

    event Staked(address indexed user, uint amount);
    event Unstaked(address indexed user, uint amount);
    event RewardPaid(address indexed user, uint reward);

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function stake(uint amount) external {
        require(amount > 0, "Cannot stake 0");
        stakingToken.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint amount) external {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        stakedAmount[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function distributeRewards(uint reward) external {
        // Logic to distribute rewards
    }
}
