// tests/unit/services/stakingService.test.js

const stakingService = require('../../src/services/stakingService');
const { Staking } = require('../../src/models/stakingModel');
const { User } = require('../../src/models/userModel');

describe('Staking Service', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Staking.deleteMany({});
        await User.deleteMany({});
    });

    it('should stake tokens', async () => {
        const staking = await stakingService.stakeTokens(user._id, 100);
        expect(staking).toHaveProperty('userId', user._id);
        expect(staking).toHaveProperty('amount', 100);
    });

    it('should unstake tokens', async () => {
        await stakingService.stakeTokens(user._id, 100);
        const unstaking = await stakingService.unstakeTokens(user._id, 50);
        expect(unstaking).toHaveProperty('amount', 50);
    });
});
