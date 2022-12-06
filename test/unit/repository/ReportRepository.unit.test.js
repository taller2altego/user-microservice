// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Models
const ReportModel = require('../../../src/model/ReportModel');

// Service under test
const ReportRepository = require('../../../src/repository/ReportRepository');

describe('ReportRepository Test Suite', () => {
  afterEach(sandbox.restore);

  describe('createReport', () => {
    let mockReports;

    beforeEach(() => {
      mockReports = sandbox.mock(ReportModel);
    });

    afterEach(() => sandbox.restore());

    it('Should crete a report as expected', async () => {
      mockReports
        .expects('create')
        .once()
        .withArgs({ prop: 1 })
        .resolves({
          toJSON: () => ({
            prop: 1
          })
        });

      const result = await ReportRepository.createReport({ prop: 1 });
      expect(result).to.deep.equal({ prop: 1 });

      sandbox.verify();
    });
  });

  describe('findAll', () => {
    let mockReports;

    beforeEach(() => {
      mockReports = sandbox.mock(ReportModel);
    });

    afterEach(() => sandbox.restore());

    it('Should find all reports as expected', async () => {
      mockReports
        .expects('findAll')
        .once()
        .withArgs()
        .resolves([{ toJSON: () => ({ otherProp: true }) }]);

      const result = await ReportRepository.findAll({});
      expect(result).to.deep.equal([{ otherProp: true }]);
      sandbox.verify();
    });
  });

  describe('findAllByDriverId', () => {
    let mockReports;

    beforeEach(() => {
      mockReports = sandbox.mock(ReportModel);
    });

    afterEach(() => sandbox.restore());

    it('Should call findAllByDriverId', async () => {
      mockReports
        .expects('findAll')
        .once()
        .withArgs({ where: { driverId: 1 } })
        .resolves([{ toJSON: () => ({ id: 1 }) }]);

      const result = await ReportRepository.findAllByDriverId(1);
      expect(result).to.deep.equal([{ id: 1 }]);
      sandbox.verify();
    });
  });
});