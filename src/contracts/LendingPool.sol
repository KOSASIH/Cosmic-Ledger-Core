// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LendingPool is Ownable {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        bool isActive;
    }

    mapping(address => Loan) public loans;

    function lend(address borrower, uint256 amount, uint256 interestRate, uint256 duration) external onlyOwner {
        loans[borrower] = Loan(borrower, amount, interestRate, duration, block.timestamp, true);
    }

    function repay() external {
        Loan storage loan = loans[msg.sender];
        require(loan.isActive, "No active loan");
        require(block.timestamp <= loan.startTime + loan.duration, "Loan duration expired");

        uint256 totalRepayment = loan.amount + (loan.amount * loan.interestRate) / 100;
        // Transfer tokens from borrower to this contract
        // Assuming the token is ERC20
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), totalRepayment);
        loan.isActive = false;
    }
}
