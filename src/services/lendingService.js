// src/services/lendingService.js

const { Loan } = require('../models/lendingModel');
const { User } = require('../models/userModel');

class LendingService {
    async createLoan(userId, amount, interestRate, duration) {
        const loan = new Loan({
            userId,
            amount,
            interestRate,
            duration,
            status: 'active',
            createdAt: new Date(),
        });

        await loan.save();
        return loan;
    }

    async repayLoan(loanId) {
        const loan = await Loan.findById(loanId);
        if (!loan) throw new Error('Loan not found');

        loan.status = 'repaid';
        await loan.save();
        return loan;
    }

    async getUserLoans(userId) {
        return await Loan.find({ userId }).sort({ createdAt: -1 });
    }
}

module.exports = new LendingService();
