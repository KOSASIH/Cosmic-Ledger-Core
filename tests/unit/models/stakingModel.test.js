// tests/unit/models/stakingModel.test.js

const mongoose = require('mongoose');
const { Staking } = require('../../src/models/stakingModel');

describe('Staking Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a staking record successfully', async () => {
        const staking = new Staking({ userId: 'userId123', amount: 100, duration: 30 });
        const savedStaking = await staking.save();
        expect(savedStaking._id).toBeDefined();
        expect(savedStaking.userId).toBe('userId123');
        expect(savedStaking.amount).toBe(100);
        expect(savedStaking.duration).toBe(30);
    });

    it('should not allow negative staking amount', async () => {
        const staking = new Staking({ userId: 'userId123', amount: -50, duration: 30 });
        await expect(staking.save()).rejects.toThrow();
    });

    it('should not allow zero staking amount', async () => {
        const staking = new Staking({ userId: 'userId123', amount: 0, duration: 30 });
        await expect(staking.save()).rejects.toThrow();
    });

    it('should retrieve a staking record by userId', async () => {
        const staking = new Staking({ userId: 'userId123', amount: 100, duration: 30 });
        await staking.save();
        const foundStaking = await Staking.findOne({ userId: 'userId123' });
        expect(foundStaking).toBeDefined();
        expect(foundStaking.amount).toBe(100);
    });

    it('should update a staking record', async () => {
        const staking = new Staking({ userId: 'userId123', amount: 100, duration: 30 });
        const savedStaking = await staking.save();
        savedStaking.amount = 200;
        const updatedStaking = await savedStaking.save();
        expect(updatedStaking.amount).toBe(200);
    });

    it('should delete a staking record', async () => {
        const staking = new Staking({ userId: 'userId123', amount: 100, duration: 30 });
        const savedStaking = await staking.save();
        await Staking.deleteOne({ _id: savedStaking._id });
        const deletedStaking = await Staking.findById(savedStaking._id);
        expect(deletedStaking).toBeNull();
    });
});
