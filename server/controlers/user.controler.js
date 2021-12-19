const user = require('../models/user.model');

module.exports = {
    test: (req,res,next) => {
        res.status(200).json({ message: 'user connected!' });
    },
}