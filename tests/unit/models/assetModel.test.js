// tests/unit/models/assetModel.test.js

const mongoose = require('mongoose');
const { Asset } = require('../../src/models/assetModel');

describe('Asset Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create an asset successfully', async () => {
        const asset = new Asset({ name: 'Real Estate', value: 100000 });
        const savedAsset = await asset.save();
        expect(savedAsset._id).toBeDefined();
        expect(savedAsset.name).toBe('Real Estate');
        expect(savedAsset.value).toBe(100000);
    });
});
