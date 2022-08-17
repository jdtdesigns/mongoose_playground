const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  }
});

studentSchema.virtual('fullName')
  .set(function (v) {
    this.set({ first: v });
  });

const Student = model('Student', studentSchema);

// Student.deleteMany({}).then(() => Student.insertMany([
//   {
//     first: 'JD',
//     last: 'Tadlock'
//   },
//   {
//     first: 'Sarah',
//     last: 'Tadlock'
//   }
// ])).then(() => console.log('inserted'))

module.exports = Student;