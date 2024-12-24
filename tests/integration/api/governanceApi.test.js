// tests/integration/api/governanceApi.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const { User } = require('../../src/models/userModel');
const { Proposal } = require('../../src/models/governanceModel');

describe('Governance API', () => {
    let user;

    beforeEach(async () => {
        // Create a test user
        user = await User.create({ email: 'test@example.com', password: 'password123' });
        user.token = 'mockedToken'; // Replace with actual token generation logic if needed
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Proposal.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a proposal', async () => {
        const response = await request(app)
            .post('/api/governance/proposals')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ title: 'New Proposal', description: 'Proposal description' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('proposal');
        expect(response.body.proposal.title).toBe('New Proposal');
        expect(response.body.proposal.description).toBe('Proposal description');
        expect(response.body.proposal.userId).toBe(user._id.toString());
    });

    it('should get all proposals', async () => {
        await request(app)
            .post('/api/governance/proposals')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ title: 'New Proposal', description: 'Proposal description' });

        const response = await request(app)
            .get('/api/governance/proposals')
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('proposals');
        expect(response.body.proposals.length).toBe(1);
        expect(response.body.proposals[0].title).toBe('New Proposal');
    });

    it('should vote on a proposal', async () => {
        const proposalResponse = await request(app)
            .post('/api/governance/proposals')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ title: 'New Proposal', description: 'Proposal description' });

        const proposalId = proposalResponse.body.proposal._id;

        const voteResponse = await request(app)
            .post(`/api/governance/proposals/${proposalId}/vote`)
            .set('Authorization', `Bearer ${user.token}`)
            .send({ vote: 'yes' });
        
        expect(voteResponse.status).toBe(200);
        expect(voteResponse.body).toHaveProperty('message', 'Vote recorded successfully');
    });

    it('should not allow voting on a non-existent proposal', async () => {
        const response = await request(app)
            .post('/api/governance/proposals/nonexistentId/vote')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ vote: 'yes' });
        
        expect(response.status).toBe(404); // Assuming your API returns 404 for not found
        expect(response.body).toHaveProperty('error', 'Proposal not found');
    });
});
