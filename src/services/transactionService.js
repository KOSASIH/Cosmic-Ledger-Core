// src/services/transactionService.js

const { Transaction } = require('../models/transactionModel');
const { User } = require('../models/userModel');

class TransactionService {
    async createTransaction(userId, amount, type) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const transaction = new Transaction({
            userId,
            amount,
            type,
            status: 'pending',
            createdAt: new Date(),
        });

        await transaction.save();
        return transaction;
    }

    async processTransaction(transactionId) {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error('Transaction not found');

        // Logic to process the transaction (e.g., call smart contract)
        transaction.status = 'completed';
        await transaction.save();
        return transaction;
    }

    async getTransactionHistory(userId) {
        return await Transaction.find({ userId }).sort({ createdAt: -1 });
    }
}

module.exports = new TransactionService();
