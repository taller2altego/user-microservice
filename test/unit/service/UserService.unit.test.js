/* eslint-disable indent */
// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Repositories
const UserRepository = require('../../../src/repository/UserRepository');

// UserServices
const UserService = require('../../../src/service/UserService');

describe('UserService Unit Tests', () => {
    describe('singUp test', () => {
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Should call findUserByEmail and signUp as expected', async () => {
            const body = { email: 'asd', roleId: 3 };
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(null);

            userRepository
                .expects('signUp')
                .once()
                .withArgs({ email: 'asd', roleId: 3 })
                .resolves({ roleId: 3 });

            const travel = await UserService.signUp(body);
            expect(travel).to.deep.equal({ role: 'user' });
            sandbox.verify();
        });
        it('Should call findUserByEmail and signUp as expected when exist user', async () => {
            const body = { email: 'asd', roleId: 3 };
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves({});

            await UserService
                .signUp(body)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('El usuario ya existe');
                });
            sandbox.verify();
        });
    });

    describe('Oauth', () => {
        const body = { email: 'asd', isBlocked: false };
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Should oauth login as expected', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(null);

            await UserService
                .oauthLogin(body)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('No se pudo encontrar el usuario solicitado.');
                });
            sandbox.verify();
        });
        it('Should oauth login as expected', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(body);

            const travel = await UserService.oauthLogin(body);
            expect(travel).to.deep.equal({
                email: 'asd',
                isAdmin: false,
                isBlocked: false,
                isSuperadmin: false
            });
        });
        sandbox.verify();
    });
    describe('login', () => {
        const body = { email: 'asd', isBlocked: false, password: '123' };
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Should fail login as expected if not exist', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(null);

            await UserService
                .login(body)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('No se pudo encontrar el usuario solicitado.');
                });
            sandbox.verify();
        });
        it('Should fail with different password login as expected', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves({ ...body, password: '1234' });

            await UserService
                .login(body)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('Email o contraseña erronea, intentar nuevamente.');
                });
            sandbox.verify();
        });
        it('Should login well as expected', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves({ ...body, password: '123' });

            const travel = await UserService.login(body);
            expect(travel).to.deep.equal({
                email: 'asd',
                isAdmin: false,
                isBlocked: false,
                isSuperadmin: false,
                password: '123'
            });
            sandbox.verify();
        });
    });
    describe('findAllUsers', () => {
        const body = { email: 'asd', isBlocked: false, password: '123' };
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should findAll well as expected', async () => {
            userRepository
                .expects('findAll')
                .once()
                .withArgs(body)
                .resolves([]);

            const travel = await UserService.findAllUsers(body);
            expect(travel).to.deep.equal([]);
            sandbox.verify();
        });
    })
    describe('findUserById', () => {
        const body = { id: 1 };
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should findUserById well as expected', async () => {
            userRepository
                .expects('findById')
                .once()
                .withArgs(body)
                .resolves({ roleId: 3 });

            const travel = await UserService.findUserById(body);
            expect(travel).to.deep.equal({ role: 'user' });
            sandbox.verify();
        });
        it('Should fail findUserById as expected if not exist', async () => {
            userRepository
                .expects('findById')
                .once()
                .withArgs(body)
                .resolves(null);

            await UserService
                .findUserById(body)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('No se pudo encontrar el usuario solicitado.');
                });
            sandbox.verify();
        });
    })
    describe('verifyUserByEmail', () => {
        const body = { email: "asd" };
        let userRepository;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should verifyUserByEmail well as expected', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(body);

            const travel = await UserService.verifyUserByEmail(body.email);
            expect(travel).to.deep.equal();
            sandbox.verify();
        });
        it('Should fail verifyUserByEmail as expected if not exist', async () => {
            userRepository
                .expects('findUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves(null);

            await UserService
                .verifyUserByEmail(body.email)
                .then(() => { throw new Error(); })
                .catch(err => {
                    expect(err.message).to.be.equal('No se pudo encontrar el usuario solicitado.');
                });
            sandbox.verify();
        });
    });

    describe('patchUserById', () => {
        const body = { score: 12 };
        const fakeScores = { numberOfScores: 13, totalScore: 20 };
        let userRepository;
        let userService;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
            userService = sandbox.mock(UserService);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should patchUserById score well as expected', async () => {
            userService
                .expects('findUserById')
                .once()
                .withArgs(10)
                .resolves(fakeScores);

            userRepository
                .expects('patchById')
                .once()
                .withArgs(10, { numberOfScores: 14, totalScore: 272 })
                .resolves({});

            const travel = await UserService.patchUserById(10, body);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
        it('Should patchUserById transaction well as expected', async () => {
            const bodyPatch = { isTransaction: true, withdrawFunds: true, balance: 2 };
            userService
                .expects('findUserById')
                .once()
                .withArgs(10)
                .resolves({ balance: 3 });


            userRepository
                .expects('patchById')
                .once()
                .withArgs(10, { balance: 1 })
                .resolves({});

            const travel = await UserService.patchUserById(10, bodyPatch);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
        it('Should patchUserById transaction withdraw well as expected', async () => {
            const bodyPatch = { isTransaction: true, withdrawFunds: false, balance: 2 };
            userService
                .expects('findUserById')
                .once()
                .withArgs(10)
                .resolves({ balance: 3 });


            userRepository
                .expects('patchById')
                .once()
                .withArgs(10, { balance: 5 })
                .resolves({});

            const travel = await UserService.patchUserById(10, bodyPatch);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
        it('Should patchUserById transaction withdraw well as expected', async () => {
            const bodyPatch = { balance: 2 };
            userService
                .expects('findUserById')
                .once()
                .withArgs(10)
                .resolves({ balance: 3 });


            userRepository
                .expects('patchById')
                .once()
                .withArgs(10, { balance: 2 })
                .resolves({});

            const travel = await UserService.patchUserById(10, bodyPatch);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
    });
    describe('patchUserByEmail', () => {
        const body = { email: 'asd' };
        let userRepository;
        let userService;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
            userService = sandbox.mock(UserService);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should patchUserByEmail score well as expected', async () => {
            userService
                .expects('verifyUserByEmail')
                .once()
                .withArgs(body.email)
                .resolves({});

            userRepository
                .expects('patchByEmail')
                .once()
                .withArgs(body.email, body)
                .resolves({});

            const travel = await UserService.patchUserByEmail(body.email, body);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
    });
    describe('patchUserByEmail', () => {
        const body = { userId: 10 };
        let userRepository;
        let userService;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
            userService = sandbox.mock(UserService);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should patchUserByEmail score well as expected', async () => {
            userRepository
                .expects('patchById')
                .once()
                .withArgs(body.email, body)
                .resolves({});

            const travel = await UserService.patchDefaultLocationByUserId(body.email, body);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
    });
    describe('changePasswordByEmail', () => {
        const body = { password: '10', email: 'asd' };
        let userRepository;
        let userService;

        beforeEach(() => {
            userRepository = sandbox.mock(UserRepository);
            userService = sandbox.mock(UserService);
        });

        afterEach(() => {
            sandbox.restore();
        });
        it('Should changePasswordByEmail score well as expected', async () => {
            userService
                .expects('patchUserByEmail')
                .once()
                .withArgs(body.email, { password: body.password })
                .resolves({});

            const travel = await UserService.changePasswordByEmail(body.email, body.password);
            expect(travel).to.deep.equal({});
            sandbox.verify();
        });
    });
});