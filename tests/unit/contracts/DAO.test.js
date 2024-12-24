// tests/unit/contracts/DAO.test.js

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DAO Contract', function () {
    let DAO, dao, owner, addr1;

    beforeEach(async function () {
        DAO = await ethers.getContractFactory('DAO');
        [owner, addr1] = await ethers.getSigners();
        dao = await DAO.deploy();
        await dao.deployed();
    });

    it('should add a member', async function () {
        await dao.addMember(addr1.address);
        expect(await dao.members(addr1.address)).to.be.true;
    });

    it('should remove a member', async function () {
        await dao.addMember(addr1.address);
        await dao.removeMember(addr1.address);
        expect(await dao.members(addr1.address)).to.be.false;
    });
});
