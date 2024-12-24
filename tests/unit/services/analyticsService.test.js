// tests/unit/services/analyticsService.test.js

const analyticsService = require('../../src/services/analyticsService');

describe('Analytics Service', () => {
    it('should generate user analytics', async () => {
        const analytics = await analyticsService.generateUserAnalytics('userId123');
        expect(analytics).toHaveProperty('userId', 'userId123');
        expect(analytics).toHaveProperty('activityCount');
    });
});
