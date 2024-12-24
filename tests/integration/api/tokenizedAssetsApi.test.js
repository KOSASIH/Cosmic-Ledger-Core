// tests/integration/api/tokenizedAssetsApi.test.js

const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/models/userModel');
const { Asset } = require('../../src/models/assetModel');

describe('Tokenized Assets API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
        user.token = 'mockedToken'; // Replace with actual token generation logic if needed
    });

    afterEach(async () => {
        await Asset.deleteMany({});
        await User.deleteMany({});
    });

    it('should tokenize an asset', async () => {
        const response = await request(app)
            .post('/api/tokenized-assets')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'Real Estate', description: 'Description of the asset', value: 100000 });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('asset');
        expect(response.body.asset.name).toBe('Real Estate');
        expect(response.body.asset.value).toBe(100000);
    });

    it('should retrieve an asset by token ID', async () => {
        const assetResponse = await request(app)
            .post('/api/tokenized-assets')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'Real Estate', description: 'Description of the asset', value: 100000 });

        const assetId = assetResponse.body.asset._id;

        const response = await request(app)
            .get(`/api/tokenized-assets/${assetId}`)
            .set('Authorization', `Bearer ${user.token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('asset');
        expect(response.body.asset.name).toBe('Real Estate');
    });

    it('should not allow tokenizing an asset with the same name', async () => {
        await request(app)
            .post('/api/tokenized-assets')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'Real Estate', description: 'Description of the asset', value: 100000 });

        const response = await request(app)
            .post('/api/tokenized-assets')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'Real Estate', description: 'Another description', value: 200000 });
        
        expect(response.status).toBe(400); // Assuming your API returns 400 for duplicate asset names
        expect(response.body).toHaveProperty('error', 'Asset with this name already exists');
    });
});
