const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   console.log('Inside pre-save hook');
//   console.log('this.isModified("password"):', this.isModified('password'));
//   console.log('typeof next:', typeof next);
//   console.log('next is function?', typeof next === 'function');

//   try {
//     if (!this.isModified('password')) {
//       console.log('Password not modified, calling next()');
//       return next();
//     }

//     console.log('Password modified, hashing...');
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

//     console.log('Hashing complete, calling next()');
//     next();
//   } catch (error) {
//     console.error('Error in pre-save hook:', error);
//     next(error);
//   }
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);