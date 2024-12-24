// tests/unit/contracts/TokenizedAssets.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TokenizedAssets Contract', function () {
    let TokenizedAssets, tokenizedAssets, owner;

    beforeEach(async function () {
        TokenizedAssets = await ethers.getContractFactory('TokenizedAssets');
        [owner] = await ethers.getSigners();
        tokenizedAssets = await TokenizedAssets.deploy();
        await tokenizedAssets.deployed();
    });

    it('should tokenize an asset', async function () {
        const response = await tokenizedAssets.tokenizeAsset("Real Estate", "Description of the asset", 100000);
        expect(response).to.have.property('status', 'Asset tokenized');

        const asset = await tokenizedAssets.assets(1);
        expect(asset.name).to.equal("Real Estate");
        expect(asset.description).to.equal("Description of the asset");
        expect(asset.value).to.equal(100000);
        expect(asset.tokenId).to.equal(1);
    });

    it('should retrieve an asset by token ID', async function () {
        await tokenizedAssets.tokenizeAsset("Real Estate", "Description of the asset", 100000);
        const asset = await tokenizedAssets.assets(1);
        expect(asset.name).to.equal("Real Estate");
        expect(asset.value).to.equal(100000);
    });

    it('should not allow tokenizing an asset with the same name', async function () {
        await tokenizedAssets.tokenizeAsset("Real Estate", "Description of the asset", 100000);
        await expect(tokenizedAssets.tokenizeAsset("Real Estate", "Another description", 200000))
            .to.be.revertedWith('Asset with this name already exists');
    });

    it('should allow updating an asset', async function () {
        await tokenizedAssets.tokenizeAsset("Real Estate", "Description of the asset", 100000);
        await tokenizedAssets.updateAsset(1, "Updated Real Estate", "Updated description", 150000);
        
        const asset = await tokenizedAssets.assets(1);
        expect(asset.name).to.equal("Updated Real Estate");
        expect(asset.value).to.equal(150000);
    });

    it('should not allow updating a non-existent asset', async function () {
        await expect(tokenizedAssets.updateAsset(999, "Non-existent Asset", "Description", 100000))
            .to.be.revertedWith('Asset does not exist');
    });

    it('should allow deleting an asset', async function () {
        await tokenizedAssets.tokenizeAsset("Real Estate", "Description of the asset", 100000);
        await tokenizedAssets.deleteAsset(1);
        
        await expect(tokenizedAssets.assets(1)).to.be.revertedWith('Asset does not exist');
    });

    it('should not allow deleting a non-existent asset', async function () {
        await expect(tokenizedAssets.deleteAsset(999)).to.be.revertedWith('Asset does not exist');
    });
});
