// tests/unit/contracts/Insurance.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Insurance Contract', function () {
    let Insurance, insurance, owner, addr1;

    beforeEach(async function () {
        Insurance = await ethers.getContractFactory('Insurance');
        [owner, addr1] = await ethers.getSigners();
        insurance = await Insurance.deploy();
        await insurance.deployed();
    });

    it('should create an insurance policy', async function () {
        await insurance.createPolicy(1000);
        const policy = await insurance.policies(owner.address);
        expect(policy.coverageAmount).to.equal(1000);
        expect(policy.isActive).to.be.true;
    });

    it('should claim an insurance policy', async function () {
        await insurance.createPolicy(1000);
        await insurance.claimPolicy();
        const policy = await insurance.policies(owner.address);
        expect(policy.isActive).to.be.false;
    });
});
