// tests/unit/services/userService.test.js

const userService = require('../../src/services/userService');
const { User } = require('../../src/models/userModel');

describe('User  Service', () => {
    let user;

    beforeEach(async () => {
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should create a user', async () => {
        const newUser  = await userService.createUser ('newuser@example.com', 'password123');
        expect(newUser ).toHaveProperty('email', 'newuser@example.com');
    });

    it('should find a user by email', async () => {
        const foundUser  = await userService.findUser ByEmail('test@example.com');
        expect(foundUser ).toHaveProperty('email', 'test@example.com');
    });

    it('should not find a non-existent user', async () => {
        const foundUser  = await userService.findUser ByEmail('nonexistent@example.com');
        expect(foundUser ).toBeNull();
    });
});
