// tests/unit/services/crossChainService.test.js

const crossChainService = require('../../src/services/crossChainService');

describe('CrossChain Service', () => {
    it('should initiate a cross-chain transfer', async () => {
        const response = await crossChainService.initiateTransfer('0xAddress', 100, 'Ethereum');
        expect(response).toHaveProperty('status', 'Transfer initiated');
    });

    it('should complete a cross-chain transfer', async () => {
        await crossChainService.initiateTransfer('0xAddress', 100, 'Ethereum');
        const response = await crossChainService.completeTransfer('0xAddress', 100, 'Ethereum');
        expect(response).toHaveProperty('status', 'Transfer completed');
    });
});
