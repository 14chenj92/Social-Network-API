const router = require('express').Router();

const {
  getUsers,
  postUser,
  getIDuser,
  putUser,
  deleteUser,
  postFriend, 
  deleteFriend,
} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(postUser);

router.route('/:userId')
.get(getIDuser)
.put(putUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(postFriend)
.delete(deleteFriend);

module.exports = router;