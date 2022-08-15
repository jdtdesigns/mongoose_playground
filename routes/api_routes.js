const api_router = require('express').Router();

const User = require('../models/User');

User.findOne({})
  .then(user => {
    // console.log('fired');
    console.log(user.getFullName());
  });

api_router.get('/users', (req, res) => {
  User.find()
    .then(users => { // []
      res.json(users);
    });
});

api_router.post('/users', (req, res) => {
  User.create(req.body).then(user => {
    res.json(user);
  });
});

api_router.put('/users/:email', (req, res) => {
  User.findOneAndUpdate({
    email: req.params.email
  }, {
    password: req.body.password
  }, { new: true }).then(user => {
    res.json(user);
  });
});

module.exports = api_router;