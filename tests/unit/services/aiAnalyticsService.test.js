// tests/unit/services/aiAnalyticsService.test.js

const aiAnalyticsService = require('../../src/services/aiAnalyticsService');

describe('AI Analytics Service', () => {
    it('should generate AI-driven insights', async () => {
        const insights = await aiAnalyticsService.generateInsights('userId123');
        expect(insights).toHaveProperty('userId', 'userId123');
        expect(insights).toHaveProperty('predictions');
    });
});
