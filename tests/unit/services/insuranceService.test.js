// tests/unit/services/insuranceService.test.js

const insuranceService = require('../../src/services/insuranceService');
const { Policy } = require('../../src/models/insuranceModel');
const { User } = require('../../src/models/userModel');

describe('Insurance Service', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Policy.deleteMany({});
        await User.deleteMany({});
    });

    it('should create an insurance policy', async () => {
        const policy = await insuranceService.createPolicy(user._id, 1000);
        expect(policy).toHaveProperty('userId', user._id);
        expect(policy).toHaveProperty('coverageAmount', 1000);
    });

    it('should claim an insurance policy', async () => {
        const policy = await insuranceService.createPolicy(user._id, 1000);
        const claimedPolicy = await insuranceService.claimPolicy(policy._id);
        expect(claimedPolicy).toHaveProperty('isActive', false);
    });

    it('should not allow claiming a non-existent policy', async () => {
        await expect(insuranceService.claimPolicy('nonexistentPolicyId')).rejects.toThrow('Policy does not exist');
    });
});
