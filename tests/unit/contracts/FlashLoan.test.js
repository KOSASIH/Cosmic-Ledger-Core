// tests/unit/contracts/FlashLoan.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FlashLoan Contract', function () {
    let FlashLoan, flashLoan, owner;

    beforeEach(async function () {
        FlashLoan = await ethers.getContractFactory('FlashLoan');
        [owner] = await ethers.getSigners();
        flashLoan = await FlashLoan.deploy();
        await flashLoan.deployed();
    });

    it('should take a flash loan', async function () {
        const response = await flashLoan.takeLoan(owner.address, 100);
        expect(response).to.have.property('status', 'Loan taken');
    });

    it('should repay a flash loan', async function () {
        await flashLoan.takeLoan(owner.address, 100);
        const response = await flashLoan.repayLoan(owner.address, 100);
        expect(response).to.have.property('status', 'Loan repaid');
    });
});
