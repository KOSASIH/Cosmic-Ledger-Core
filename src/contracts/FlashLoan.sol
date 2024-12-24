// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoan {
    event LoanTaken(address indexed borrower, uint amount);
    event LoanRepaid(address indexed borrower, uint amount);

    function takeLoan(IERC20 token, uint amount) external {
        // Logic to provide flash loan
        emit LoanTaken(msg.sender, amount);
    }

    function repayLoan(IERC20 token, uint amount) external {
        // Logic to repay flash loan
        emit LoanRepaid(msg.sender, amount);
    }
}
