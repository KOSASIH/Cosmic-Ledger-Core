// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint amount);
    event SubmitTransaction(address indexed owner, uint indexed txIndex);
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(uint indexed txIndex);

    address[] public owners;
    mapping(uint => mapping(address => bool)) public isConfirmed;
    mapping(uint => Transaction) public transactions;
    uint public transactionCount;

    struct Transaction {
        address to;
        uint value;
        bool executed;
    }

    constructor(address[] memory _owners) {
        owners = _owners;
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submitTransaction(address to, uint value) external {
        require(isOwner(msg.sender), "Not an owner");
        transactionCount++;
        transactions[transactionCount] = Transaction(to, value, false);
        emit SubmitTransaction(msg.sender, transactionCount);
    }

    function confirmTransaction(uint txIndex) external {
        require(isOwner(msg.sender), "Not an owner");
        require(!isConfirmed[txIndex][msg.sender], "Transaction already confirmed");

        isConfirmed[txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, txIndex);
    }

    function executeTransaction(uint txIndex) external {
        require(isConfirmed[txIndex][msg.sender], "Transaction not confirmed");
        Transaction storage transaction = transactions[txIndex];
        require(!transaction.executed, "Transaction already executed");

        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction failed");
        emit ExecuteTransaction(txIndex);
    }

    function isOwner(address account) internal view returns (bool) {
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == account) {
                return true;
            }
        }
        return false;
    }
}
