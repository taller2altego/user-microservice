// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Repositories
const ReportRepository = require('../../../src/repository/ReportRepository');

// services
const ReportService = require('../../../src/service/ReportService');

describe('ReportService Unit Tests', () => {

  describe('findReports', () => {
    let reportRepository;

    beforeEach(() => {
      reportRepository = sandbox.mock(ReportRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should call findAllReports as expected', async () => {
      reportRepository
        .expects('findAll')
        .once()
        .withArgs()
        .resolves({});

      const result = await ReportService.findAllReports();
      expect(result).to.deep.equal({});
    });
  });

  describe('findTravel', () => {
    let reportRepository;

    beforeEach(() => {
      reportRepository = sandbox.mock(ReportRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should create reports as expected', async () => {
      reportRepository
        .expects('createReport')
        .once()
        .withArgs({ ok: true })
        .resolves({});

      const travel = await ReportService.createReport({ ok: true });
      expect(travel).to.deep.equal({});
    });
  });
});