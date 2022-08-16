const { Schema, model } = require('mongoose');

// const postSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   body: {
//     type: String,
//     required: true
//   }
// });

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  posts: [{
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }]
});

const User = model('User', userSchema);

// User.deleteMany({}).then(() => console.log('users deleted'));

module.exports = User;