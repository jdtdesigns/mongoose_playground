const { Schema, model } = require('mongoose');

// const studentSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   }
// })

const groupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  students: [{
    name: {
      type: String,
      required: true
    }
  }]
}, {
  toJSON: {
    virtuals: true // include any virtual properties on a client side request
  }
});

groupSchema.virtual('student_count').get(function () {
  return this.students.length;
});

// groupSchema.methods.validatePassword = function () {
//   console.log(`Hi, ${this.group_name}`)
// }


const Group = model('Group', groupSchema);


// User.deleteMany({}).then(() => console.log('users deleted'));

module.exports = Group;