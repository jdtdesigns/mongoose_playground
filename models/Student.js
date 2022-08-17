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
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (val) {
    const split = val.trim().split(' ');
    this.set({ first: split[0], last: split[1] });
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