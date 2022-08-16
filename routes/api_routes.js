const api_router = require('express').Router();
const User = require('../models/User');
const { Types: { ObjectId } } = require('mongoose');

// Create User
api_router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error('You need to input something dude.');

  const new_user = await User.create(req.body);

  res.send(new_user);
});

// Get all users
api_router.get('/users', async (req, res) => {
  const users = await User.find();

  res.send(users);
});

// Create Post
api_router.post('/posts/:user_id', async (req, res) => {
  // req.body {title: '', body: ''}
  const user = await User.findOne({ _id: req.params.user_id });

  user.posts.push(req.body);
  user.save();

  res.send(user);
});

// Get posts by a user id /api/posts/asldfkajsdlfkj
api_router.get('/posts/:user_id', async (req, res) => {
  const user = await User.findOne({
    _id: req.params.user_id
  });
  // Using Aggregates
  // const posts = await User.aggregate([
  //   { $match: { _id: ObjectId(req.params.user_id) } },
  //   { $unwind: '$posts' },
  //   {
  //     $project: {
  //       _id: '$posts._id',
  //       title: '$posts.title',
  //       body: '$posts.body'
  //     }
  //   }
  // ]).exec();

  console.log(posts);

  res.send(user.posts);
});

// Get user's post bv _id
api_router.get('/posts', async (req, res) => {
  // post_id in params
  // user_id in req.body
  const user = await User.findOne({ _id: req.query.user_id });
  const post = user.posts.id(req.query.post_id);

  res.send(post);
});

// Delete a single post by id
api_router.delete('/posts', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.user_id });
    user.posts.id(req.query.post_id).remove();
    user.save();
  } catch (err) {
    console.log(err);
  }

  res.send('Post deleted successfully.');
});

module.exports = api_router;








 // const post = User.aggregate([
  //   { $match: { _id: req.params.user_id } },
  //   { $unwind: '$posts' },
  //   { $match: { _id: req.params.post_id } },
  //   {
  //     $project: {
  //       title: '$title',
  //       body: '$body'
  //     }
  //   }
  // ])