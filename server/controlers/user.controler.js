const bcrypt = require('bcrypt');
const jws = require('jsonwebtoken');
const user = require('../models/user.model');

module.exports = {
    signup: (req,res,next) => {
        delete req.body._id;
        bcrypt.hash(req.body.pass,10).then((pass) => {
            req.body.pass = pass;

            const newUser = new user({ ...req.body });
            newUser.save().then(
                () => {
                    res.status(201).json({ message: 'user signed up!'});
                }
            ).catch(error => res.status(500).json({ error }));
        })
        
        
    },

    login: (req,res,next) => {
        user.findOne({ email: req.body.email })
            .then(val => {
                if(!val) {
                    return res.status(404).json({ error: new Error('user not found!') });
                }
                bcrypt.compare(req.body.pass, val.pass).then(
                    (valid) => {
                        if(!valid) {
                            return res.status(401).json({ error: new Error('wrong password!') });
                        }
                        res.status(200).json({
                            val,
                            token: jws.sign(
                                { email: val.email },
                                'super akuma(akuma) vs kalak(lili)',
                                { expiresIn: '2h' }
                            )
                        });
                    }
                )
            })
            .catch(error => res.status(500).json({ error }));
    }
}