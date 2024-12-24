// src/models/insuranceModel.js

const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    coverageAmount: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;
