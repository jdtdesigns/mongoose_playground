const { Schema, model, SchemaTypes } = require('mongoose');

const groupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  students: [{
    type: SchemaTypes.ObjectId,
    ref: 'Student'
  }]
}, {
  toJSON: {
    virtuals: true // include any virtual properties on a client side request
  }
});

groupSchema.virtual('student_count').get(function () {
  return this.students.length;
});

const Group = model('Group', groupSchema);

// Group.deleteMany({}).then(() => console.log('groups deleted.'))

module.exports = Group;