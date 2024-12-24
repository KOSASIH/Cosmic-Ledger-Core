// tests/unit/models/insuranceModel.test.js

const mongoose = require('mongoose');
const { Policy } = require('../../src/models/insuranceModel');

describe('Insurance Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create an insurance policy successfully', async () => {
        const policy = new Policy({ userId: 'userId123', coverageAmount: 1000, isActive: true });
        const savedPolicy = await policy.save();
        expect(savedPolicy._id).toBeDefined();
        expect(savedPolicy.coverageAmount).toBe(1000);
        expect(savedPolicy.isActive).toBe(true);
    });
});
