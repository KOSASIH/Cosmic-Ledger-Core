// tests/unit/contracts/CrossChainBridge.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('CrossChainBridge Contract', function () {
    let CrossChainBridge, bridge, owner, addr1;

    beforeEach(async function () {
        CrossChainBridge = await ethers.getContractFactory('CrossChainBridge');
        [owner, addr1] = await ethers.getSigners();
        bridge = await CrossChainBridge.deploy();
        await bridge.deployed();
    });

    it('should initiate a transfer', async function () {
        const tx = await bridge.initiateTransfer(addr1.address, 100, 'Ethereum');
        await tx.wait();
        expect(await bridge.getTransferStatus(addr1.address)).to.equal('transfer initiated');
    });

    it('should complete a transfer', async function () {
        await bridge.initiateTransfer(addr1.address, 100, 'Ethereum');
        const tx = await bridge.completeTransfer(addr1.address, 100, 'Ethereum');
        await tx.wait();
        expect(await bridge.getTransferStatus(addr1.address)).to.equal('transfer completed');
    });
});
