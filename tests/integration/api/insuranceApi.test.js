// tests/integration/api/insuranceApi.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const { User } = require('../../src/models/userModel');
const { Policy } = require('../../src/models/insuranceModel');

describe('Insurance API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
        user.token = 'mockedToken'; // Replace with actual token generation logic if needed
    });

    afterEach(async () => {
        await Policy.deleteMany({});
        await User.deleteMany({});
    });

    it('should create an insurance policy', async () => {
        const response = await request(app)
            .post('/api/insurance')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ coverageAmount: 1000 });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('policy');
        expect(response.body.policy.coverageAmount).toBe(1000);
        expect(response.body.policy.userId).toBe(user._id.toString());
    });

    it('should get user insurance policies', async () => {
        await request(app)
            .post('/api/insurance')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ coverageAmount: 1000 });

        const response = await request(app)
            .get('/api/insurance/history')
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('policies');
        expect(response.body.policies.length).toBe(1);
        expect(response.body.policies[0].coverageAmount).toBe(1000);
    });

    it('should claim an insurance policy', async () => {
        const policyResponse = await request(app)
            .post('/api/insurance')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ coverageAmount: 1000 });

        const policyId = policyResponse.body.policy._id;

        const claimResponse = await request(app)
            .post(`/api/insurance/claim/${policyId}`)
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(claimResponse.status).toBe(200);
        expect(claimResponse.body).toHaveProperty('message', 'Claim processed successfully');
    });
});
