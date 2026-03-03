// Test utils

// Import modules
const Book = require('../../app/models/db').Book;
const bcrypt = require('bcrypt');
const config = require('../../app/config/auth.config');
const User = require('../../app/models/db').User;
const app = require('../../app/app');
const chai = require('chai');
const expect = require('chai').expect;


module.exports.populateBooks = async () => {
    await Book.create( { title: 'El guardián entre el centeno', author: 'J.D. Salinger' } );
    await Book.create( { title: 'La vida es sueño', author: 'Calderón de la Barca' } );
}

module.exports.dropBooks = async () => {
    await Book.destroy({  truncate: true, force: true, restartIdentity: true });
}

module.exports.populateUsers = async () => {
    await User.create( { username: 'Username1', password: bcrypt.hashSync('Password1', config.salt) } );
    await User.create( { username: 'Username2', password: bcrypt.hashSync('Password2', config.salt) } );
}

module.exports.dropUsers = async () => {
    await User.destroy({  truncate: true, force: true, restartIdentity: true });
}

module.exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        chai.request(app)
            .post('/login')
            .send({ username: username, password: password })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('token');
                resolve(res.body.token);
            });
        });
}