// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Models
const CommentModel = require('../../../src/model/CommentModel');

// Service under test
const CommentRepository = require('../../../src/repository/CommentRepository');

describe('CommentRepository Test Suite', () => {
  afterEach(sandbox.restore);

  describe('createComment', () => {
    let mockComment;

    beforeEach(() => {
      mockComment = sandbox.mock(CommentModel);
    });

    afterEach(() => sandbox.restore());

    it('Should create comment as expected', async () => {
      mockComment
        .expects('create')
        .once()
        .withArgs({ prop: 1 })
        .resolves({
          toJSON: () => ({
            prop: 1
          })
        });

      const result = await CommentRepository.createComment({ prop: 1 });
      expect(result).to.deep.equal({ prop: 1 });

      sandbox.verify();
    });
  });

  describe('findAllCommentsById', () => {
    let mockComment;

    beforeEach(() => {
      mockComment = sandbox.mock(CommentModel);
    });

    afterEach(() => sandbox.restore());

    it('Should findAllCommentsById as expected', async () => {
      mockComment
        .expects('findAll')
        .once()
        .withArgs({ where: { userId: 1, isUserComment: true } })
        .resolves([{ toJSON: () => ({ otherProp: true }) }]);

      const result = await CommentRepository.findAllCommentsById(1, true);
      expect(result).to.deep.equal([{ otherProp: true }]);
      sandbox.verify();
    });
  });
});