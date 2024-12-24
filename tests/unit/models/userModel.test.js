// tests/unit/models/userModel.test.js

const mongoose = require('mongoose');
const { User } = require('../../src/models/userModel');

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a user successfully', async () => {
        const user = new User({ email: 'test@example.com', password: 'password123' });
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe('test@example.com');
    });

    it('should not create a user with duplicate email', async () => {
        const user1 = new User({ email: 'test@example.com', password: 'password123' });
        await user1.save();
        const user2 = new User({ email: 'test@example.com', password: 'password456' });
        await expect(user2.save()).rejects.toThrow();
    });
});
