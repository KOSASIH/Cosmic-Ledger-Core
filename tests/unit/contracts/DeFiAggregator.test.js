// tests/unit/contracts/DeFiAggregator.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DeFiAggregator Contract', function () {
    let DeFiAggregator, aggregator, owner;

    beforeEach(async function () {
        DeFiAggregator = await ethers.getContractFactory('DeFiAggregator');
        [owner] = await ethers.getSigners();
        aggregator = await DeFiAggregator.deploy();
        await aggregator.deployed();
    });

    it('should optimize yield', async function () {
        const response = await aggregator.optimizeYield(owner.address, 100);
        expect(response).to.have.property('status', 'Yield optimized');
    });
});
