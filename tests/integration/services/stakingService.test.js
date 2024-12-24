// tests/integration/services/stakingService.test.js

const stakingService = require('../../src/services/stakingService');
const { User } = require('../../src/models/userModel');
const { Staking } = require('../../src/models/stakingModel');

describe('Staking Service', () => {
    let user;

    beforeEach(async () => {
        // Create a test user
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Staking.deleteMany({});
        await User.deleteMany({});
    });

    it('should stake tokens', async () => {
        const staking = await stakingService.stakeTokens(user._id, 100);
        expect(staking).toHaveProperty('amount', 100);
        expect(staking.userId).toBe(user._id.toString());
    });

    it('should get staking history for a user', async () => {
        await stakingService.stakeTokens(user._id, 100);
        const stakings = await stakingService.getUser Stakings(user._id);
        expect(stakings.length).toBe(1);
        expect(stakings[0]).toHaveProperty('amount', 100);
    });

    it('should not allow staking a negative amount', async () => {
        await expect(stakingService.stakeTokens(user._id, -50)).rejects.toThrow('Amount must be positive');
    });

    it('should not allow staking zero amount', async () => {
        await expect(stakingService.stakeTokens(user._id, 0)).rejects.toThrow('Amount must be positive');
    });

    it('should allow unstaking tokens', async () => {
        const staking = await stakingService.stakeTokens(user._id, 100);
        const unstaking = await stakingService.unstakeTokens(user._id, 50);
        expect(unstaking).toHaveProperty('amount', 50);
    });

    it('should not allow unstaking more than staked amount', async () => {
        await stakingService.stakeTokens(user._id, 100);
        await expect(stakingService.unstakeTokens(user._id, 150)).rejects.toThrow('Insufficient staked amount');
    });
});
