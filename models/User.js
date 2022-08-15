const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  }
});

userSchema.methods.getFullName = function () {
  return this.first_name + ' ' + this.last_name;
}

const User = model('User', userSchema);

// User.deleteMany({}).then(() => console.log('users deleted'));

module.exports = User;