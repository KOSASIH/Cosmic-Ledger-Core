// tests/unit/services/transactionService.test.js

const transactionService = require('../../src/services/transactionService');
const { Transaction } = require('../../src/models/transactionModel');
const { User } = require('../../src/models/userModel');

describe('Transaction Service', () => {
    let user;

    beforeEach(async () => {
        // Create a test user
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Transaction.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a transaction', async () => {
        const transaction = await transactionService.createTransaction(user._id, 100, 'deposit');
        expect(transaction).toHaveProperty('userId', user._id);
        expect(transaction).toHaveProperty('amount', 100);
        expect(transaction).toHaveProperty('type', 'deposit');
        expect(transaction).toHaveProperty('status', 'pending');
    });

    it('should process a transaction', async () => {
        const transaction = await transactionService.createTransaction(user._id, 100, 'deposit');
        const processedTransaction = await transactionService.processTransaction(transaction._id);
        expect(processedTransaction).toHaveProperty('status', 'completed');
    });

    it('should get transaction history for a user', async () => {
        await transactionService.createTransaction(user._id, 100, 'deposit');
        await transactionService.createTransaction(user._id, 50, 'withdrawal');
        const history = await transactionService.getTransactionHistory(user._id);
        expect(history.length).toBe(2);
    });
});
