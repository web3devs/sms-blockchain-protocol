const mongoose = require('mongoose');

let mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;

// test MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  // we're connected!
  console.log('Connected to mongoDB.');
});

module.exports = db;
