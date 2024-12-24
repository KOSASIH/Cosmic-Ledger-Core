// src/models/stakingModel.js

const mongoose = require('mongoose');

const stakingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['staked', 'unstaked'],
        default: 'staked',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Staking = mongoose.model('Staking', stakingSchema);
module.exports = Staking;
