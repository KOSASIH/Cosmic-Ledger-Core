// tests/integration/api/userApi.test.js

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const { User } = require('../../src/models/userModel');

describe('User API', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({ email: 'newuser@example.com', password: 'password123' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe('newuser@example.com');
    });

    it('should authenticate a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: 'wrongpassword' });
        expect(response.status).toBe(401);
    });
});
