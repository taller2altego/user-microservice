// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Models
const DriverModel = require('../../../src/model/DriverModel');
const User = require('../../../src/model/UserModel');

// Service under test
const DriverRepository = require('../../../src/repository/DriverRepository');

describe('DriverRepository Test Suite', () => {
  afterEach(sandbox.restore);

  describe('signUp', () => {
    let mockDriver;

    beforeEach(() => {
      mockDriver = sandbox.mock(DriverModel);
    });

    afterEach(() => sandbox.restore());

    it('Should create a driver as expected', async () => {
      mockDriver
        .expects('create')
        .once()
        .withArgs({ prop: 1 })
        .resolves({
          toJSON: () => ({ prop: 1 })
        });

      const result = await DriverRepository.create({ prop: 1 });
      expect(result).to.deep.equal({ prop: 1 });

      sandbox.verify();
    });
  });

  describe('findAll', () => {
    let mockDriver;

    beforeEach(() => {
      mockDriver = sandbox.mock(DriverModel);
    });

    afterEach(() => sandbox.restore());

    it('Should find all users as expected', async () => {

      mockDriver
        .expects('findAll')
        .once()
        .withArgs()
        .resolves([
          {
            toJSON: () => ({
              otherProp: true,
              numberOfScores: 10,
              totalScore: 10
            })
          }
        ]);

      const result = await DriverRepository.findAll({});
      expect(result).to.deep.equal([{ otherProp: true, numberOfScores: 10, totalScore: 1 }]);
      sandbox.verify();
    });

    it('Should set score as 0', async () => {

      mockDriver
        .expects('findAll')
        .once()
        .withArgs()
        .resolves([
          {
            toJSON: () => ({
              otherProp: true,
              numberOfScores: 0,
              totalScore: 0
            })
          }
        ]);

      const result = await DriverRepository.findAll({});
      expect(result).to.deep.equal([{ otherProp: true, numberOfScores: 0, totalScore: 0 }]);
      sandbox.verify();
    });
  });

  describe('findById', () => {
    let mockDriver;

    beforeEach(() => {
      mockDriver = sandbox.mock(DriverModel);
    });

    afterEach(() => sandbox.restore());

    it('Should find drivers as expected', async () => {
      const params = {
        include: [{ model: User, as: 'user', required: false }],
        where: { id: 1 }
      };

      mockDriver
        .expects('findOne')
        .once()
        .withArgs(params)
        .resolves({
          toJSON: () => ({
            otherProp: true,
            numberOfScores: 10,
            totalScore: 10,
            user: { name: 'test', lastname: 'test' }
          })
        });

      const result = await DriverRepository.findById(1);

      expect(result).to.deep.equal({
        otherProp: true,
        numberOfScores: 10,
        totalScore: 1,
        user: { name: 'test', lastname: 'test' }
      });

      sandbox.verify();
    });

    it('Should not find drivers when the id does not exist', async () => {
      const params = {
        include: [{ model: User, as: 'user', required: false }],
        where: { id: 2 }
      };

      mockDriver
        .expects('findOne')
        .once()
        .withArgs(params)
        .resolves();

      const result = await DriverRepository.findById(2);
      expect(result).to.deep.equal(null);
      sandbox.verify();
    });
  });

  describe('patchById', () => {
    let mockDriver;

    beforeEach(() => {
      mockDriver = sandbox.mock(DriverModel);
    });

    afterEach(() => sandbox.restore());

    it('Should call patchById as expected', async () => {
      mockDriver.expects('update').once().withArgs({ toUpdate: 1 }, { where: { id: 1 } }).resolves({});
      const result = await DriverRepository.patchById(1, { toUpdate: 1 });
      expect(result).to.deep.equal({ toUpdate: 1 });
      sandbox.verify();
    });
  });
});