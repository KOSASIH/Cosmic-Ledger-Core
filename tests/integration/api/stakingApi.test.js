// tests/integration/api/stakingApi.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const { User } = require('../../src/models/userModel');
const { Staking } = require('../../src/models/stakingModel');

describe('Staking API', () => {
    let user;

    beforeEach(async () => {
        // Create a test user
        user = await User.create({ email: 'test@example.com', password: 'password123' });
        // Assuming you have a way to generate a token for the user
        user.token = 'mockedToken'; // Replace with actual token generation logic if needed
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Staking.deleteMany({});
        await User.deleteMany({});
    });

    it('should stake tokens', async () => {
        const response = await request(app)
            .post('/api/staking')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 100 });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('staking');
        expect(response.body.staking.amount).toBe(100);
        expect(response.body.staking.userId).toBe(user._id.toString());
    });

    it('should get staking history for a user', async () => {
        await request(app)
            .post('/api/staking')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 100 });

        const response = await request(app)
            .get('/api/staking/history')
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('stakings');
        expect(response.body.stakings.length).toBe(1);
        expect(response.body.stakings[0].amount).toBe(100);
    });

    it('should not allow staking a negative amount', async () => {
        const response = await request(app)
            .post('/api/staking')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: -50 });
        
        expect(response.status).toBe(400); // Assuming your API returns 400 for bad requests
        expect(response.body).toHaveProperty('error', 'Amount must be positive');
    });

    it('should not allow staking zero amount', async () => {
        const response = await request(app)
            .post('/api/staking')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ amount: 0 });
        
        expect(response.status).toBe(400); // Assuming your API returns 400 for bad requests
        expect(response.body).toHaveProperty('error', 'Amount must be positive');
    });
});
