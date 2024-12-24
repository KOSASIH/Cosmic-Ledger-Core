// src/services/insuranceService.js

const { Policy } = require('../models/insuranceModel');
const { User } = require('../models/userModel');

class InsuranceService {
    async createPolicy(userId, coverageAmount) {
        const policy = new Policy ```javascript
({
            userId,
            coverageAmount,
            isActive: true,
            createdAt: new Date(),
        });

        await policy.save();
        return policy;
    }

    async claimPolicy(policyId) {
        const policy = await Policy.findById(policyId);
        if (!policy || !policy.isActive) throw new Error('Policy not active or not found');

        // Logic to process the claim
        policy.isActive = false; // Mark policy as claimed
        await policy.save();
        return policy;
    }

    async getUser Policies(userId) {
        return await Policy.find({ userId }).sort({ createdAt: -1 });
    }
}

module.exports = new InsuranceService();
