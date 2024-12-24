// tests/unit/services/socialTradingService.test.js

const socialTradingService = require('../../src/services/socialTradingService');

describe('Social Trading Service', () => {
    it('should allow a user to follow another user', async () => {
        const response = await socialTradingService.followUser('followerId', 'followedId');
        expect(response).toHaveProperty('status', 'User followed');
    });

    it('should allow a user to unfollow another user', async () => {
        await socialTradingService.followUser('followerId', 'followedId');
        const response = await socialTradingService.unfollowUser('followerId', 'followedId');
        expect(response).toHaveProperty('status', 'User unfollowed');
    });
});
