// tests/integration/api/lendingApi.test.js

const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/models/userModel');
const { Loan } = require('../../src/models/lendingModel');

describe('Lending API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await Loan.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a loan', async () => {
        const response = await request(app)
            .post('/api/lending')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 1000, interestRate: 5, duration: 30 });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('loan');
        expect(response.body.loan.amount).toBe(1000);
    });

    it('should get user loans', async () => {
        await request(app)
            .post('/api/lending')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 1000, interestRate: 5, duration: 30 });

        const response = await request(app)
            .get('/api/lending/history')
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('loans');
        expect(response.body.loans.length).toBe(1);
    });
});
