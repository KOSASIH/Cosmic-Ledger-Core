// tests/unit/services/identityService.test.js

const identityService = require('../../src/services/identityService');
const { User } = require('../../src/models/userModel');
const { Identity } = require('../../src/models/identityModel'); // Assuming you have an Identity model

describe('Identity Service', () => {
    let user;

    beforeEach(async () => {
        // Create a test user
        user = await User.create({ email: 'test@example.com', password: 'password123' });
    });

    afterEach(async () => {
        // Clean up the database after each test
        await Identity.deleteMany({});
        await User.deleteMany({});
    });

    it('should create a decentralized identity', async () => {
        const identityData = { name: 'John Doe', age: 30 };
        const identity = await identityService.createIdentity(user._id, identityData);
        
        expect(identity).toHaveProperty('userId', user._id);
        expect(identity).toHaveProperty('name', 'John Doe');
        expect(identity).toHaveProperty('age', 30);
    });

    it('should retrieve a decentralized identity', async () => {
        const identityData = { name: 'John Doe', age: 30 };
        await identityService.createIdentity(user._id, identityData);
        
        const identity = await identityService.getIdentity(user._id);
        expect(identity).toHaveProperty('name', 'John Doe');
        expect(identity).toHaveProperty('age', 30);
    });

    it('should not retrieve identity for a non-existent user', async () => {
        const identity = await identityService.getIdentity('nonexistentUser Id');
        expect(identity).toBeNull();
    });

    it('should update a decentralized identity', async () => {
        const identityData = { name: 'John Doe', age: 30 };
        await identityService.createIdentity(user._id, identityData);
        
        const updatedIdentity = await identityService.updateIdentity(user._id, { age: 31 });
        expect(updatedIdentity).toHaveProperty('age', 31);
    });

    it('should not update identity for a non-existent user', async () => {
        await expect(identityService.updateIdentity('nonexistentUser Id', { name: 'New Name' }))
            .rejects.toThrow('User  does not exist');
    });

    it('should delete a decentralized identity', async () => {
        const identityData = { name: 'John Doe', age: 30 };
        const identity = await identityService.createIdentity(user._id, identityData);
        
        await identityService.deleteIdentity(identity._id);
        const deletedIdentity = await identityService.getIdentity(user._id);
        expect(deletedIdentity).toBeNull();
    });

    it('should not delete identity for a non-existent identity ID', async () => {
        await expect(identityService.deleteIdentity('nonexistentIdentityId'))
            .rejects.toThrow('Identity does not exist');
    });
});
