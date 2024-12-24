// tests/unit/services/notificationService.test.js

const notificationService = require('../../src/services/notificationService');

describe('Notification Service', () => {
    it('should send a notification', async () => {
        const response = await notificationService.sendNotification('test@example.com', 'Test Notification');
        expect(response).toHaveProperty('status', 'Notification sent');
    });

    it('should not send a notification to an invalid email', async () => {
        await expect(notificationService.sendNotification('invalid-email', 'Test Notification')).rejects.toThrow('Invalid email address');
    });
});
