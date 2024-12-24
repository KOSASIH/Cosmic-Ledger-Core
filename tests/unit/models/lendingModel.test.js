// tests/unit/models/lendingModel.test.js

const mongoose = require('mongoose');
const { Loan } = require('../../src/models/lendingModel');

describe('Lending Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a loan successfully', async () => {
        const loan = new Loan({ userId: 'userId123', amount: 1000, interestRate: 5, duration: 30 });
        const savedLoan = await loan.save();
        expect(savedLoan._id).toBeDefined();
        expect(savedLoan.amount).toBe(1000);
        expect(savedLoan.interestRate).toBe(5);
    });
});
