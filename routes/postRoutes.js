const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const {
    addPost,
    deletePost,
    likePost,
    unlikePost,
    addCommentonPost,
    getPost,
    getAllPosts
} = require('../controllers/postControllers')

router.post('/posts' , isAuthenticated , addPost);
router.delete('/posts/:id' , isAuthenticated ,deletePost);
router.post('/like/:id' , isAuthenticated ,likePost);
router.post('/unlike/:id' , isAuthenticated ,unlikePost);
router.post('/comment/:id' , isAuthenticated ,addCommentonPost);
router.get('/posts/:id' , isAuthenticated ,getPost);
router.get('/all_posts' , isAuthenticated ,getAllPosts);

module.exports = router;