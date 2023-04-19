const router = require('express').Router();

const {
  getThoughts,
  postThoughts,
  getIDthought,
  putThought,
  deleteThought,
  postReaction, 
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(postThoughts);

router.route('/:thoughtId')
.get(getIDthought)
.put(putThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(postReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;