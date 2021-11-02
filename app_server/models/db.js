// MONGO DATABASE CONNECTION AND DISCONNECTION EVENTS VIA MONGOOSE (BOILERPLATE) -- NOV 01, 2021 © COPYRIGHT LICENCED UNDER THE IFE JEREMIAH LICENCE AND THE MIT LICENCE.
// ----------------------------------------------------------------------------------------------------------------

const mongoose = require('mongoose'); //Requires mongoose package

// (NOTICE) ---- SET DATABASE URI IN A .ENV FILE  

// URIs to connect to a database
let dbURI = process.env.DBURI;    // Set and Load database URI from .env file in development mode
let dbType = 'local database';

if (process.env.NODE_ENV === 'production') {    // Load database URI in production mode
  dbURI = process.env.MONGODB_URI;
  dbType = 'remote database';
}

// Connect to database via mongoose
mongoose.connect(dbURI, { useNewUrlParser: true });

// Listens and responds to mongoose connect events
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connected to ${dbType}`);
  })
  .on('error', err => {
    console.log(`Mongoose connection error:\n${err}`);
  })
  .on('disconnected', () => {
    console.log('Mongoose disconnected.');
  });

// Emit SIGINT signal for termination on windows platforms
const readLine = require('readline');
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}

// Function to close the mongoose connection 
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};


// Listens for node processes on termination signals
// For application termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// For Heroku application termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
// ----------------------------------------------------------------------------------------------------------------
// INCLUDE COMPILED DATABASE MODELS AND OTHER FILES HERE

require('./users');   //Replace this require with built database model
