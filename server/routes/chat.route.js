const auth = require('../middlewares/auth.middleware');

const chatCtrl = require('../controlers/chat.controler');

const router = require('express').Router();

router.post('/', chatCtrl.newChat);

router.get('/', chatCtrl.getChats);

module.exports = router;