// tests/unit/contracts/Governance.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Governance Contract', function () {
    let Governance, governance, owner, addr1;

    beforeEach(async function () {
        Governance = await ethers.getContractFactory('Governance');
        [owner, addr1] = await ethers.getSigners();
        governance = await Governance.deploy(/* constructor parameters */);
        await governance.deployed();
    });

    it('should create a proposal', async function () {
        await governance.createProposal('Increase the block size');
        const proposal = await governance.proposals(1);
        expect(proposal.description).to.equal('Increase the block size');
    });

    it('should allow voting on a proposal', async function () {
        await governance.createProposal('Increase the block size');
        await governance.connect(addr1).vote(1);
        const proposal = await governance.proposals(1);
        expect(proposal.voteCount).to.equal(1);
    });

    it('should execute a proposal', async function () {
        await governance.createProposal('Increase the block size');
        await governance.connect(addr1).vote(1);
        await governance.executeProposal(1);
        const proposal = await governance.proposals(1);
        expect(proposal.executed).to.be.true;
    });
});
