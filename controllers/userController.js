const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
          .then((User) => res.json(User))
          .catch((err) => res.status(500).json(err));
    },
    getIDuser(req, res) {
        User.findOne({ _id: req.params.userId })
          .then((User) =>
            !User
              ? res.status(404).json({ message: 'No user found with that id' })
              : res.json(User)
          )
          .catch((err) => res.status(500).json(err));
    },
    postUser(req, res) {
        User.create(req.body)
          .then((User) => res.json(User))
          .catch((err) => res.status(500).json(err));
    },
    putUser(req, res) {
      console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((User) =>
          !User
            ? res.status(404).json({ message: 'No user found with that id' })
            : res.json(User))
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((Users) =>
            !Users
              ? res.status(404).json({ message: 'No such User exists' })
              : User.findOneAndUpdate(
                  { Users: req.params.userId },
                  { $pull: { Users: req.params.userId } },
                  { new: true }
                )
          )
          .then((User) =>
            !User
              ? res.status(404).json({
                  message: 'User deleted',
                })
              : res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    postFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((User) =>
            !User
              ? res
                  .status(404)
                  .json({ message: 'No User found with that ID' })
              : res.json(User)
          )
          .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
      console.log( req.params.friendId)
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((User) =>
            !User
              ? res
                  .status(404)
                  .json({ message: 'No User found with that ID' })
              : res.json(User)
          )
          .catch((err) => res.status(500).json(err));
      },
}