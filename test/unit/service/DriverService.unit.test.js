// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Repositories
const UserRepository = require('../../../src/repository/UserRepository');
const DriverRepository = require('../../../src/repository/DriverRepository');

// services
const DriverService = require('../../../src/service/DriverService');
const ReportRepository = require('../../../src/repository/ReportRepository');

describe('DriverService Unit Tests', () => {

  describe('associateDriverToUser', () => {
    let driverRepository;
    let userRepository;

    beforeEach(() => {
      driverRepository = sandbox.mock(DriverRepository);
      userRepository = sandbox.mock(UserRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should associate driver to user as expected', async () => {
      userRepository.expects('findById').once().withArgs(1).resolves({ id: 1 });
      userRepository.expects('patchById').once().withArgs(1, { roleId: 4 }).resolves({});
      driverRepository.expects('create').once().withArgs({ userId: 1, prop: 2 }).resolves({ id: 1 });

      const result = await DriverService.associateDriverToUser({ prop: 2 }, 1);
      expect(result).to.deep.equal({ id: 1 });
      sandbox.verify();
    });

    it('Should associate driver to user as expected', async () => {
      userRepository.expects('findById').once().withArgs(1).resolves(null);

      await DriverService
        .associateDriverToUser({ prop: 2 }, 1)
        .then(() => { throw new Error(); })
        .catch(err => {
          expect(err.message).to.equal('No se pudo encontrar el usuario solicitado.');
        });
      sandbox.verify();
    });
  });

  describe('findAllDrivers', () => {
    let driverRepository;

    beforeEach(() => {
      driverRepository = sandbox.mock(DriverRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should find all drivers as expected', async () => {
      driverRepository
        .expects('findAll')
        .once()
        .withArgs()
        .resolves({});

      const driver = await DriverService.findAllDrivers(1);
      expect(driver).to.deep.equal({});
      sandbox.verify();
    });
  });

  describe('findAllReportsByDriverId', () => {
    let reportRepository;

    beforeEach(() => {
      reportRepository = sandbox.mock(ReportRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should findAllReportsByDriverId as expected', async () => {
      reportRepository
        .expects('findAllByDriverId')
        .once()
        .withArgs(1)
        .resolves({});

      const driver = await DriverService.findAllReportsByDriverId(1);
      expect(driver).to.deep.equal({});
      sandbox.verify();
    });
  });

  describe('findDriverById', () => {
    let driverRepository;

    beforeEach(() => {
      driverRepository = sandbox.mock(DriverRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should find a driver by id', async () => {
      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves({ id: 1 });

      const driver = await DriverService.findDriverById(1);
      expect(driver).to.deep.equal({ id: 1 });
      sandbox.verify();
    });

    it('Should not find a driver by id', async () => {
      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves(null);

      await DriverService.findDriverById(1)
        .then(() => { throw new Error(); })
        .catch(err => {
          expect(err.message).to.equal('No se pudo encontrar el driver solicitado.');
        });
      sandbox.verify();
    });
  });

  describe('patchDriverById', () => {
    let driverRepository;

    beforeEach(() => {
      driverRepository = sandbox.mock(DriverRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should patch score as expected', async () => {
      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves({ id: 1, totalScore: 3, numberOfScores: 1 });

      driverRepository
        .expects('patchById')
        .once()
        .withArgs(1, { numberOfScores: 2, totalScore: 6 })
        .resolves({ ok: true });

      const body = { score: 3 };

      const response = await DriverService.patchDriverById(1, body);
      expect(response).to.deep.equal({ ok: true });
      sandbox.verify();
    });

    it('Should not be a withdrawFunds transaction', async () => {
      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves({ id: 1, balance: 1000 });

      driverRepository
        .expects('patchById')
        .once()
        .withArgs(1, { balance: 2000 })
        .resolves({ ok: true });

      const body = { balance: 1000, isTransaction: true };

      const response = await DriverService.patchDriverById(1, body);
      expect(response).to.deep.equal({ ok: true });
      sandbox.verify();
    });

    it('Should be a withdrawFunds transaction', async () => {
      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves({ id: 1, balance: 2000 });

      driverRepository
        .expects('patchById')
        .once()
        .withArgs(1, { balance: 1000 })
        .resolves({ ok: true });

      const body = { balance: 1000, isTransaction: true, withdrawFunds: true };

      const response = await DriverService.patchDriverById(1, body);
      expect(response).to.deep.equal({ ok: true });
      sandbox.verify();
    });

    it('Should be a patch', async () => {

      driverRepository
        .expects('findById')
        .once()
        .withArgs(1)
        .resolves({ id: 1 });

      driverRepository
        .expects('patchById')
        .once()
        .withArgs(1, { balance: 1000 })
        .resolves({ ok: true });

      const body = { balance: 1000 };

      const response = await DriverService.patchDriverById(1, body);
      expect(response).to.deep.equal({ ok: true });
      sandbox.verify();
    });
  });
});
