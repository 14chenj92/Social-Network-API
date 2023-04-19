const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((Thought) => res.json(Thought))
          .catch((err) => res.status(500).json(err));
    },
    getIDthought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No Thought found with that id' })
              : res.json(Thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    postThoughts(req, res) {
        Thought.create(req.body)
          .then((Thought) => res.json(Thought))
          .catch((err) => res.status(500).json(err));
    },
    putThought(req, res) {
      console.log(req.body);
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((Thought) =>
          !Thought
            ? res.status(404).json({ message: 'No Thought found with that id' })
            : res.json(Thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((Thoughts) =>
            !Thoughts
              ? res.status(404).json({ message: 'No such Thought exists' })
              : Thought.findOneAndUpdate(
                  { Thoughts: req.params.thoughtId },
                  { $pull: { Thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((Thought) =>
            !Thought
              ? res.status(404).json({
                  message: 'Thought deleted',
                })
              : res.json({ message: 'Thought successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    postReaction(req, res) {
        Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            )
              .then((Thought) =>
                !Thought
                  ? res
                      .status(404)
                      .json({ message: 'No Thought found with that ID' })
                  : res.json(Thought)
              )
              .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
      console.log( req.params.reactionId )
        Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } }},
              { runValidators: true, new: true }
            )
              .then((Thought) =>
                !Thought
                  ? res
                      .status(404)
                      .json({ message: 'No Thought found with that ID' })
                  : res.json(Thought)
            )
              .catch((err) => res.status(500).json(err));
    },
}