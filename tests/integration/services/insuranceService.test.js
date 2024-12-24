// tests/integration/services/insuranceService.test.js

const insuranceService = require('../../src/services/insuranceService');
const { User } = require('../../src/models/userModel');
const { Policy } = require('../../src/models/insuranceModel');

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
        expect(policy).toHaveProperty('coverageAmount', 1000);
        expect(policy.userId).toBe(user._id.toString());
    });

    it('should get user insurance policies', async () => {
        await insuranceService.createPolicy(user._id, 1000);
        const policies = await insuranceService.getUser Policies(user._id);
        expect(policies.length).toBe(1);
        expect(policies[0]).toHaveProperty('coverageAmount', 1000);
    });

    it('should claim an insurance policy', async () => {
        const policy = await insuranceService.createPolicy(user._id, 1000);
        const claimedPolicy = await insuranceService.claimPolicy(policy._id);
        expect(claimedPolicy).toHaveProperty('isActive', false);
    });
});
