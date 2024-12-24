// tests/unit/contracts/PrivacyPreserving.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PrivacyPreserving Contract', function () {
    let PrivacyPreserving, privacy, owner;

    beforeEach(async function () {
        PrivacyPreserving = await ethers.getContractFactory('PrivacyPreserving');
        [owner] = await ethers.getSigners();
        privacy = await PrivacyPreserving.deploy();
        await privacy.deployed();
    });

    it('should encrypt data', async function () {
        const data = "Sensitive Information";
        const response = await privacy.encryptData(data);
        expect(response).to.have.property('status', 'Data encrypted');
    });
});
