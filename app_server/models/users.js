// DATABASE COLLECTION FOR STORING USERS CREDENTIALS 

const mongoose = require('mongoose');
const crypto = require('crypto');   //Required for authentications


// Define mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  salt: String,
  hash: String
});


// Set encrypted paths for passwords
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');   // Creates a random string for salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');    //Creates an encrypted hash
};


// Validate submitted password
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');   //Hash the provided password
  return this.hash === hash;
}

mongoose.model('User', userSchema);
