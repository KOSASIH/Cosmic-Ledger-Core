// tests/integration/api/transactionApi.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const { User } = require('../../src/models/userModel');
const { Transaction } = require('../../src/models/transactionModel');

describe('Transaction API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Transaction.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a transaction', async () => {
        const response = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${user.token}`) // Assuming you have a way to get the token
            .send({ amount: 100, type: 'deposit' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('transaction');
        expect(response.body.transaction.amount).toBe(100);
        expect(response.body.transaction.type).toBe('deposit');
    });

    it('should get transaction history for a user', async () => {
        await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 100, type: 'deposit' });

        const response = await request(app)
            .get('/api/transactions/history')
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('transactions');
        expect(response.body.transactions.length).toBe(1);
    });
});
