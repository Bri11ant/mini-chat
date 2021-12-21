const userCtrl = require('../controlers/user.controler');
const router = require('express').Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;