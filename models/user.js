const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },   
  password:{
    type: String,
    required: true,
    minlength: 8,
    // validate: {
    //     validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    //     message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    //   },
  },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;
  