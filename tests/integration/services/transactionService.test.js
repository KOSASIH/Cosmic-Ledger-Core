// tests/integration/services/transactionService.test.js

const transactionService = require('../../src/services/transactionService');
const { User } = require('../../src/models/userModel');
const { Transaction } = require('../../src/models/transactionModel');

describe('Transaction Service', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Transaction.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a transaction', async () => {
        const transaction = await transactionService.createTransaction(user._id, 100, 'deposit');
        expect(transaction).toHaveProperty('amount', 100);
        expect(transaction).toHaveProperty('type', 'deposit');
        expect(transaction.userId).toBe(user._id.toString());
    });

    it('should retrieve transaction history for a user', async () => {
        await transactionService.createTransaction(user._id, 100, 'deposit');
        const transactions = await transactionService.getUser Transactions(user._id);
        expect(transactions.length).toBe(1);
        expect(transactions[0]).toHaveProperty('amount', 100);
    });
});
