const api_router = require('express').Router();

const Group = require('../models/Group');

api_router.get('/groups', async (req, res) => {
  const groups = await Group.find();

  res.send(groups);
});

api_router.post('/groups', async (req, res) => {
  const group = await Group.create(req.body);

  res.send(group);
});

api_router.post('/students', async (req, res) => {
  const { group_id, name } = req.body;

  const group = await Group.findOne({ _id: group_id });

  group.students.push({ name });
  group.save();

  res.send(group);
})

api_router.delete('/students', async (req, res) => {
  const { group_id, student_id } = req.body;

  const group = await Group.findOne({ _id: group_id });

  group.students.id(student_id).remove();
  group.save();

  res.send(group);
});

module.exports = api_router;