// tests/unit/contracts/Staking.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Staking Contract', function () {
    let Staking, staking, owner, addr1;

    beforeEach(async function () {
        Staking = await ethers.getContractFactory('Staking');
        [owner, addr1] = await ethers.getSigners();
        staking = await Staking.deploy();
        await staking.deployed();
    });

    it('should stake tokens', async function () {
        await staking.stake(100);
        expect(await staking.stakedAmount(owner.address)).to.equal(100);
    });

    it('should unstake tokens', async function () {
        await staking.stake(100);
        await staking.unstake(50);
        expect(await staking.stakedAmount(owner.address)).to.equal(50);
    });
});
