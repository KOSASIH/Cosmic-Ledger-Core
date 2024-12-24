// tests/unit/models/transactionModel.test.js

const mongoose = require('mongoose');
const { Transaction } = require('../../src/models/transactionModel');

describe('Transaction Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a transaction successfully', async () => {
        const transaction = new Transaction({ userId: 'userId123', amount: 100, type: 'deposit' });
        const savedTransaction = await transaction.save();
        expect(savedTransaction._id).toBeDefined();
        expect(savedTransaction.amount).toBe(100);
        expect(savedTransaction.type).toBe('deposit');
    });
});
