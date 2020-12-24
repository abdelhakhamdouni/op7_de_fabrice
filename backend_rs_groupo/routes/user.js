const express = require('express');

const users = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

users.post('/signup', userCtrl.signup);//route verifer sur postman
users.post('/login', userCtrl.rateLimit, userCtrl.login);// verifier sur posman
users.delete('/delete/:id', auth, userCtrl.deleteAccount);// verifier sur postman 
users.get('/userInfo/:email', auth, userCtrl.userInfo);
users.get('/usersInfo', auth, userCtrl.usersInfo);
users.put('/:id', auth, multer, userCtrl.changeInfo);//verifier sur postman
users.put('/isAdmin/:id', auth, userCtrl.isAdmin); // verifier sur postman

module.exports = users;
