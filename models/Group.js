const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const groupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  students: [studentSchema]
});

const Group = model('Group', groupSchema);

// User.deleteMany({}).then(() => console.log('users deleted'));

module.exports = Group;