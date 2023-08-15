const express = require('express');
const router = express.Router();
const {authenticateUser , getUser , followUser,  unfollowUser} = require('../controllers/userControllers');
const isAuthenticated = require('../middlewares/auth');

router.post('/authenticate' , authenticateUser);
router.get('/user' , isAuthenticated , getUser);
router.post('/follow/:id' , isAuthenticated ,followUser);
router.post('/unfollow/:id' , isAuthenticated ,unfollowUser);

module.exports = router;