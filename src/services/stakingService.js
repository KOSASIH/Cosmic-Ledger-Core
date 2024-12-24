// src/services/stakingService.js

const { Staking } = require('../models/stakingModel');
const { User } = require('../models/userModel');

class StakingService {
    async stakeTokens(userId, amount) {
        const staking = new Staking({
            userId,
            amount,
            status: 'staked',
            createdAt: new Date(),
        });

        await staking.save();
        return staking;
    }

    async unstakeTokens(stakingId) {
        const staking = await Staking.findById(stakingId);
        if (!staking) throw new Error('Staking record not found');

        staking.status = 'unstaked';
        await staking.save();
        return staking;
    }

    async getUserStakes(userId) {
        return await Staking.find({ userId }).sort({ createdAt: -1 });
    }
}

module.exports = new StakingService();
