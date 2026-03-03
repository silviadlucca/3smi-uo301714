// Test for book routes

// Import modules
const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;
const utils = require('./utils');
const fs = require('fs');
const sinon = require('sinon');
const mediaEncoding = require('../../app/media/encoding');

chai.use(require('chai-http'));
chai.use(require('chai-arrays'));

const BOOK_URI = '/books';


describe('Get books: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {        
        await utils.populateBooks();
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropBooks();
    });

    /**
     * Get all books correctly
     */
    it('should get all books', (done) => {
        chai.request(app)
            .get(BOOK_URI)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.array();
                expect(res.body.length).to.equal(2);
                done();
            });
    });

    /**
     * Get an existing book correctly
     */
    it('should get a book', (done) => {
        chai.request(app)
            .get(BOOK_URI + '/2')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.id).to.be.equal(2);
                expect(res.body.title).to.be.equal('La vida es sueño');
                expect(res.body.author).to.be.equal('Calderón de la Barca');
                done();
            });
    });
});


// Auth token
let token;

describe('Create books: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
     before(async () => {
        await utils.populateBooks();
        await utils.populateUsers();
        token = await utils.login('Username1', 'Password1');
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropBooks();
        await utils.dropUsers();
    });

    /**
     * A book should be created correctly
     */
    it('should create a valid book', (done) => {
        const title = "Harry Potter y la piedra filosofal";
        const author = "J.K. Rowling";
        chai.request(app)
            .post(BOOK_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: title, author: author })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body.title).to.be.equal(title);
                expect(res.body.author).to.be.equal(author);
                expect(res.body.id).to.be.equal(3);
                done();
            });
    });

    /**
     * An invalid title should raise an error
     */
    it('should receive an error with an invalid title', (done) => {
        chai.request(app)
            .post(BOOK_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title:"", author: "Unknown" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    /**
     * A missing title should raise an error
     */
    it('should receive an error with missing name', (done) => {
        chai.request(app)
            .post(BOOK_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ author: "Unknown" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    /**
     * An invalid author should raise an error
     */
    it('should receive an error with an invalid author', (done) => {
        chai.request(app)
            .post(BOOK_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title:"A valid title", author: "No" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });

    /**
     * A missing author should raise an error
     */
    it('should receive an error with missing author', (done) => {
        chai.request(app)
            .post(BOOK_URI)
            .set('Authorization', 'Bearer ' + token)
            .send({ title: "A valid title" })
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
    });
});

describe('Upload book covers: ', () => {

    /**
     * Populate database with some data before all the tests in this suite.
     */
    before(async () => {
        await utils.populateBooks();
        await utils.populateUsers();
        token = await utils.login('Username1', 'Password1');

        // Mock normalize function
        sinon.stub(mediaEncoding, 'normalize').resolves('/covers/cover-2.png'); // Do nothing
    });

    /**
     * This is run once after all the tests.
     */
    after(async () => {
        await utils.dropBooks();
        await utils.dropUsers();

        // Restore normalize function
        mediaEncoding.normalize.restore();
    });

    /**
     * A book cover should be uploaded correctly
     */
    it('should upload a book cover', (done) => {
        chai.request(app)
            .post(BOOK_URI + '/2/upload')
            .set('Authorization', 'Bearer ' + token)
            .attach('coverFile', fs.readFileSync('./test/assets/cover.png'), 'cover.png')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.id).to.be.equal(2);
                expect(res.body.title).to.be.equal('La vida es sueño');
                expect(res.body.author).to.be.equal('Calderón de la Barca');
                expect(res.body.cover).to.be.equal('/covers/cover-2.png');
                done();
            });
    }).timeout(5000);  // Timeout 5 secs


    /**
     * TODO: tests for invalid upoloads
     */
});
