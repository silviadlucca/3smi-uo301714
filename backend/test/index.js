// Node.js test application

// Import modules
const app = require('../app/app');
const db = require('../app/models/db');
let server;

// Wait for the Express application to be running
before(done => {
    server = app.listen(4000, done);
});

// Test the routes
require('./routes/book.routes.test');
require('./routes/auth.routes.test');

// Shutdown the server
after(async () => {
    server.close();
    await db.sequelize.close();
});