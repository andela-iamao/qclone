require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on('close', () => {
  console.info('MongoDB connection closed');
  process.exit(0);
});

module.exports = mongoose;
