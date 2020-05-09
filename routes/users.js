var express = require('express');
var router = express.Router();
var userController=require('../controllers/user-controller');

router.post('/signup',userController.signup);

router.post('/signin',userController.signin);

router.patch('/updateuser/:id',userController.updateUser);

router.delete('/deleteuser/:id',userController.deleteUser);

// router.post('/getUserDetails',userController.getUserDetails);

module.exports = router;