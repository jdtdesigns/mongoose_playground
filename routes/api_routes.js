const api_router = require('express').Router();

const Group = require('../models/Group');
const Student = require('../models/Student');

// Get all groups
api_router.get('/groups', async (req, res) => {
  const groups = await Group.find().populate('students');

  res.send(groups);
});

// Create a group
api_router.post('/groups', async (req, res) => {
  const group = await Group.create(req.body);

  res.send(group);
});

// Get all students
api_router.get('/students', async (req, res) => {
  const students = await Student.find();

  res.send(students);
});

// Create a student
api_router.post('/students', async (req, res) => {
  const { group_id, name } = req.body;

  const group = await Group.findOne({ _id: group_id });
  const student = await Student.create({
    name
  });

  group.students.push(student._id);
  group.save();

  res.send(group);
});

// Get a student by student ID
api_router.get('/student', async (req, res) => {
  const student_id = req.query.student_id;
  // const group_id = req.query.group_id;
  // const group = await Group.findOne({
  //   _id: group_id
  // }).populate('students');

  // console.log(group);
  const student = await Student.findOne({ _id: student_id });
  student.fullName = 'Sarah Tadlock';
  student.save();
  res.send(student);
});

// Delete a student from a group
api_router.delete('/student', async (req, res) => {
  const group = await Group.findOne({
    _id: req.query.group_id
  });
  group.students.id(req.query.student_id).remove();
  group.save();

  res.send(group);
});

module.exports = api_router;