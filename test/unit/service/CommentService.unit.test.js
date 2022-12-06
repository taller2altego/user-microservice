/* eslint-disable no-undef */
// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Repositories
const CommentRepository = require('../../../src/repository/CommentRepository');

// services
const CommentService = require('../../../src/service/CommentService');

describe('CommentService Unit Tests', () => {
  describe('getUserCommentsById', () => {
    let commentRepository;

    beforeEach(() => {
      commentRepository = sandbox.mock(CommentRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should call get comments as expected', async () => {
      commentRepository
        .expects('findAllCommentsById')
        .once()
        .withArgs(1, true)
        .resolves({});

      const comment = await CommentService.getUserCommentsById(1);
      expect(comment).to.deep.equal({});
    });
  });

  describe('getDriverCommentsById', () => {
    let commentRepository;

    beforeEach(() => {
      commentRepository = sandbox.mock(CommentRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should call get comments as expected', async () => {
      commentRepository
        .expects('findAllCommentsById')
        .once()
        .withArgs(1, false)
        .resolves({});

      const comment = await CommentService.getDriverCommentsById(1);
      expect(comment).to.deep.equal({});
    });
  });

  describe('createDriverComment', () => {
    let commentRepository;

    beforeEach(() => {
      commentRepository = sandbox.mock(CommentRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should call create comment as expected', async () => {
      commentRepository
        .expects('createComment')
        .once()
        .withArgs({ prop: 1, isUserComment: false })
        .resolves({});

      const comments = await CommentService.createDriverComment({ prop: 1 });
      expect(comments).to.deep.equal({});
    });
  });

  describe('createUserComment', () => {
    let commentRepository;

    beforeEach(() => {
      commentRepository = sandbox.mock(CommentRepository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should call create comment comments', async () => {
      commentRepository
        .expects('createComment')
        .once()
        .withArgs({ prop: 1, isUserComment: true })
        .resolves({});

      const comment = await CommentService.createUserComment({ prop: 1 });
      expect(comment).to.deep.equal({});
    });
  });
});
