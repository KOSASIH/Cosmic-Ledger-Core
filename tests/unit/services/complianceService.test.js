// tests/unit/services/complianceService.test.js

const complianceService = require('../../src/services/complianceService');

describe('Compliance Service', () => {
    it('should check compliance for a user', async () => {
        const complianceCheck = await complianceService.checkCompliance('userId123');
        expect(complianceCheck).toHaveProperty('compliant', true);
    });
});
