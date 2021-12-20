const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    try {
        const tmp_token = req.headers.authorization.split(' ')[1];
        const token = jwt.verify(tmp_token,'super akuma(akuma) vs kalak(lili)');
        if(req.body.writer_chat && token.email !== req.body.writer_chat.email) {
            throw 'invalid user!';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'invalid request!', error });
    }
}

module.exports = auth;