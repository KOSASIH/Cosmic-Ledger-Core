// tests/integration/services/userService.test.js

const userService = require('../../src/services/userService');
const { User } = require('../../src/models/userModel');

describe('User Service', () => {
    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should create a user', async () => {
        const user = await userService.createUser('newuser@example.com', 'password123');
        expect(user).toHaveProperty('email', 'newuser@example.com');
    });

    it('should find a user by email', async () => {
        await userService.createUser('test@example.com', 'password123');
        const foundUser = await userService.findUserByEmail('test@example.com');
        expect(foundUser).toHaveProperty('email', 'test@example.com');
    });

    it('should not find a non-existent user', async () => {
        const foundUser = await userService.findUserByEmail('nonexistent@example.com');
        expect(foundUser).toBeNull();
    });
});
