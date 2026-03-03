// Node.js application

// Import the express application
const app = require('./app/app');

// Listening for requests at port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service listening at port ${port}`);
});