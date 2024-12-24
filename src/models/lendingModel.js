// src/models/lendingModel.js

const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // Duration in days
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'repaid', 'defaulted'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;
