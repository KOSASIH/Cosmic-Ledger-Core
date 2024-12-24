// tests/unit/services/lendingService.test.js

const lendingService = require('../../src/services/lendingService');
const { Loan } = require('../../src/models/lendingModel');
const { User } = require('../../src/models/userModel');

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
        expect(loan).toHaveProperty('userId', user._id);
        expect(loan).toHaveProperty('amount', 1000);
        expect(loan).toHaveProperty('interestRate', 5);
        expect(loan).toHaveProperty('duration', 30);
        expect(loan).toHaveProperty('status', 'active');
    });

    it('should repay a loan', async () => {
        const loan = await lendingService.createLoan(user._id, 1000, 5, 30);
        const repaidLoan = await lendingService.repayLoan(loan._id);
        expect(repaidLoan).toHaveProperty('status', 'repaid');
    });

    it('should get user loans', async () => {
        await lendingService.createLoan(user._id, 1000, 5, 30);
        const loans = await lendingService.getUserLoans(user._id);
        expect(loans.length).toBe(1);
    });
});
