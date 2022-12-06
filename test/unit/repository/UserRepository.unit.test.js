// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { Sequelize } = require('sequelize');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');
const Driver = require('../../../src/model/DriverModel');
const Report = require('../../../src/model/ReportModel');

// Models
const UserModel = require('../../../src/model/UserModel');

// Service under test
const UserRepository = require('../../../src/repository/UserRepository');

describe('UserRepository Test Suite', () => {
  afterEach(sandbox.restore);

  describe('signUp', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should signUp as expected', async () => {
      mockUser
        .expects('create')
        .once()
        .withArgs({ prop: 1, isBlocked: false })
        .resolves({
          toJSON: () => ({
            prop: 1
          })
        });

      const result = await UserRepository.signUp({ prop: 1 });
      expect(result).to.deep.equal({ prop: 1 });

      sandbox.verify();
    });
  });

  describe('findAll', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should find all users as expected', async () => {
      const reportsInclude = [{ model: Report, as: 'reports', required: false, attributes: [] }];
      const driverInclude = [{ model: Driver, as: 'drivers', required: false, include: reportsInclude }];
      const order = [[Sequelize.col('User.id'), 'ASC']];
      const includedAttributes = [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']];

      const params = {
        attributes: { include: includedAttributes },
        order,
        include: driverInclude,
        group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
      };

      mockUser
        .expects('findAll')
        .once()
        .withArgs(params)
        .resolves([
          {
            toJSON: () => ({
              otherProp: true,
              numberOfScores: 10,
              totalScore: 10
            })
          }
        ]);

      const result = await UserRepository.findAll({});
      expect(result).to.deep.equal([{ otherProp: true, numberOfScores: 10, totalScore: 1 }]);
      sandbox.verify();
    });
  });

  describe('findById', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should find users as expected', async () => {
      const reportInclude = [{ model: Report, as: 'reports', required: false, attributes: [] }];
      const driverInclude = [{ model: Driver, as: 'drivers', required: false, include: reportInclude }];
      const includedAttributes = { include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']] };

      const params = {
        attributes: includedAttributes,
        include: driverInclude,
        group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
      };

      mockUser
        .expects('findByPk')
        .once()
        .withArgs(1, params)
        .resolves({
          toJSON: () => ({
            otherProp: true,
            numberOfScores: 10,
            totalScore: 10,
            drivers: [{ id: 1 }]
          })
        });

      const result = await UserRepository.findById(1);
      expect(result).to.deep.equal({
        otherProp: true,
        numberOfScores: 10,
        totalScore: 1,
        isDriver: true,
        driverId: 1
      });
      sandbox.verify();
    });

    it('Should not find an user when the id does not exist', async () => {
      const reportInclude = [{ model: Report, as: 'reports', required: false, attributes: [] }];
      const driverInclude = [{ model: Driver, as: 'drivers', required: false, include: reportInclude }];
      const includedAttributes = { include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']] };

      const params = {
        attributes: includedAttributes,
        include: driverInclude,
        group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
      };

      mockUser
        .expects('findByPk')
        .once()
        .withArgs(2, params)
        .resolves();

      const result = await UserRepository.findById(2);
      expect(result).to.deep.equal(null);
      sandbox.verify();
    });

    it('Should not find drivers associated to the user', async () => {
      const reportInclude = [{ model: Report, as: 'reports', required: false, attributes: [] }];
      const driverInclude = [{ model: Driver, as: 'drivers', required: false, include: reportInclude }];
      const includedAttributes = { include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']] };

      const params = {
        attributes: includedAttributes,
        include: driverInclude,
        group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
      };

      mockUser
        .expects('findByPk')
        .once()
        .withArgs(2, params)
        .resolves({
          toJSON: () => ({
            otherProp: true,
            numberOfScores: 10,
            totalScore: 10,
            drivers: []
          })
        });

      const result = await UserRepository.findById(2);
      expect(result).to.deep.equal({
        otherProp: true,
        numberOfScores: 10,
        totalScore: 1,
        isDriver: false,
        driverId: undefined
      });
      sandbox.verify();
    });
  });

  describe('findUserByEmail', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should call findUserByEmail and return a user', async () => {
      mockUser.expects('findOne').once().withArgs({ where: { email: 'test@test.com' } }).resolves({ toJSON: () => ({ id: 1 }) });
      const result = await UserRepository.findUserByEmail('test@test.com');
      expect(result).to.deep.equal({ id: 1 });
      sandbox.verify();
    });

    it('Should call findUserByEmail and return nothing', async () => {
      mockUser.expects('findOne').once().withArgs({ where: { email: 'test@test.com' } }).resolves(null);
      const result = await UserRepository.findUserByEmail('test@test.com');
      expect(result).to.deep.equal(null);
      sandbox.verify();
    });
  });

  describe('patchById', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should call patchById as expected', async () => {
      mockUser.expects('update').once().withArgs({ toUpdate: 1 }, { where: { id: 1 } }).resolves({});
      const result = await UserRepository.patchById(1, { toUpdate: 1 });
      expect(result).to.deep.equal({});
      sandbox.verify();
    });
  });

  describe('patchByEmail', () => {
    let mockUser;

    beforeEach(() => {
      mockUser = sandbox.mock(UserModel);
    });

    afterEach(() => sandbox.restore());

    it('Should call patchByEmail as expected', async () => {
      mockUser.expects('update').once().withArgs({ toUpdate: 1 }, { where: { email: 'test@test.com' } }).resolves({});
      const result = await UserRepository.patchByEmail('test@test.com', { toUpdate: 1 });
      expect(result).to.deep.equal({});
      sandbox.verify();
    });
  });
});