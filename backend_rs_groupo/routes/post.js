const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, multer, postCtrl.getAllPost);
router.get('/:id', auth, multer, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/myPosts/:id', auth, multer, postCtrl.getMyPosts);


module.exports = router;
