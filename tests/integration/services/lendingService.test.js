// tests/integration/services/lendingService.test.js

const lendingService = require('../../src/services/lendingService');
const { User } = require('../../src/models/userModel');
const { Loan } = require('../../src/models/lendingModel');

describe('Lending Service', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Loan.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a loan', async () => {
        const loan = await lendingService.createLoan(user._id, 1000, 5, 30);
        expect(loan).toHaveProperty('amount', 1000);
        expect(loan.userId).toBe(user._id.toString());
    });

    it('should get user loans', async () => {
        await lendingService.createLoan(user._id, 1000, 5, 30);
        const loans = await lendingService.getUserLoans(user._id);
        expect(loans.length).toBe(1);
        expect(loans[0]).toHaveProperty('amount', 1000);
    });
});
