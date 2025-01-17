const mongoose = require('mongoose');
require('dotenv').config(); 


async function dbConnect() {

const mongoDB = process.env.MONGODB_URI;
 // Connect to MongoDB using mongoose
  await  mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
    
}

module.exports.dbConnect = dbConnect;