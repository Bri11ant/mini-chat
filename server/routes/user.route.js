const userCtrl = require('../controlers/user.controler');
const router = require('express').Router();

router.use('/', userCtrl.test);

module.exports = router;