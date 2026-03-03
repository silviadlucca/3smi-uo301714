// Test fot authorization routes

// Import modules
const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;
const utils = require('./utils');

chai.use(require('chai-http'));

const SIGNUP_URI = '/signup';
const LOGIN_URI = '/login';

describe('Sign up users: ', () => {

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropUsers();
    });

    /**
     * Sign up a valid user
     */
    it('should sign up a valid user', (done) => {
        const username = 'Username1';
        const password = 'MyPassword';
        chai.request(app)
            .post(SIGNUP_URI)
            .send({ username: 'Username3', password: 'Password3' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                done();
            });
    });

    /**
     * TODO: tests for invalid users
     */
});


describe('Log in users: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {        
        await utils.populateUsers();
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropUsers();
    });

    /**
     * Log in an existing user correctly
     */
    it('should log in an existing user', (done) => {
        const username = "Username2";
        const password = "Password2";
        chai.request(app)
            .post(LOGIN_URI)
            .send({ username: username, password: password })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.username).to.be.equal(username);
                expect(res.body.token).to.not.be.null;
                done();
            });
    });

    /**
     * TODO: tests for invalid logins
     */
});