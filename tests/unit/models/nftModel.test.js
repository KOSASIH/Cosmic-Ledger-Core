// tests/unit/models/nftModel.test.js

const mongoose = require('mongoose');
const { NFT } = require('../../src/models/nftModel');

describe('NFT Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create an NFT successfully', async () => {
        const nft = new NFT({ ownerId: 'userId123', name: 'CryptoArt', description: 'A unique piece of digital art', tokenId: 'token123' });
        const savedNFT = await nft.save();
        expect(savedNFT._id).toBeDefined();
        expect(savedNFT.name).toBe('CryptoArt');
        expect(savedNFT.description).toBe('A unique piece of digital art');
        expect(savedNFT.tokenId).toBe('token123');
    });
});
