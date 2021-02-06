var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/register', userController.userRegisterGet);

router.post('/register', userController.userRegisterPost);

router.get('/login', userController.userLoginGet);

router.post('/login', userController.userLoginPost);

router.get('/dashboard', userController.userDashboardGet);

router.post('/dashboard', userController.userDashboardPost);

module.exports = router;
