// tests/unit/contracts/MultiSigWallet.test.js

    it('should submit a transaction', async function () {
        const tx = await wallet.submitTransaction(addr2.address, 100);
        await tx.wait();
        const transaction = await wallet.transactions(0);
        expect(transaction.to).to.equal(addr2.address);
        expect(transaction.value).to.equal(100);
        expect(transaction.executed).to.be.false;
    });

    it('should confirm a transaction', async function () {
        await wallet.submitTransaction(addr2.address, 100);
        await wallet.connect(addr1).confirmTransaction(0);
        const transaction = await wallet.transactions(0);
        expect(transaction.confirmations).to.equal(1);
    });

    it('should execute a transaction after enough confirmations', async function () {
        await wallet.submitTransaction(addr2.address, 100);
        await wallet.connect(addr1).confirmTransaction(0);
        await wallet.connect(owner).confirmTransaction(0);
        await wallet.executeTransaction(0);
        const transaction = await wallet.transactions(0);
        expect(transaction.executed).to.be.true;
    });
});
