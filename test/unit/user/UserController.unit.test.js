// // Testing
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
// const sandbox = require('sinon');

// chai.use(chaiAsPromised);
// const { expect } = chai;

// // Service
// const UserServiceMock = require('../mock/UserService.mock');

// // controller
// const UserController = require('../../../src/controller/');

// describe('UserController Test Suite', () => {

//   before(() => {
//     UserController.__set__('UserService', UserServiceMock);
//   });

//   afterEach(sandbox.restore);

//   describe('Create user', () => {
//     // let mockTicket;
//     // let mockResponse;

//     // let objTest;

//     // beforeEach(() => {
//     //   objTest = { send: (args) => { return args; } };
//     //   mockTicket = sandbox.mock(TicketService);
//     //   mockResponse = sandbox.mock(objTest);
//     // });

//     // afterEach(() => sandbox.restore());

//     it('Should call ticket models as expected', async () => {
//       await UserController.signUp({ body: {} }, { body: {} }, () => { });
//       expect(1).to.equal(1);
//       // mockTicket
//       //   .expects('getTickets')
//       //   .once()
//       //   .withArgs()
//       //   .resolves([1, 2, 3]);

//       // mockResponse
//       //   .expects('send')
//       //   .once()
//       //   .withArgs([1, 2, 3])
//       //   .resolves(true);

//       // await TicketController.getTickets({}, objTest);
//       // sandbox.verify();
//     });
//   });

//   // describe('Create Ticket', () => {
//   //   let mockTicket;
//   //   let mockResponse;
//   //   let objTest;

//   //   beforeEach(() => {
//   //     objTest = { send: () => ({ status: (value) => value }) };
//   //     mockTicket = sandbox.mock(TicketService);
//   //     mockResponse = sandbox.mock(objTest);
//   //   });

//   //   afterEach(() => sandbox.restore());

//   //   it('Should call createTicket models as expected', async () => {
//   //     mockTicket
//   //       .expects('createTicket')
//   //       .once()
//   //       .withArgs({ title: 'title', description: 'asd' })
//   //       .resolves({ id: 1 });

//   //     mockResponse
//   //       .expects('send')
//   //       .once()
//   //       .withArgs({ id: 1 })
//   //       .returns({ status: () => { } });

//   //     await TicketController.createTicket({ body: { title: 'title', description: 'asd' } }, objTest);
//   //     sandbox.verify();
//   //   });
//   // });
// });