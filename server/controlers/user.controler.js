const user = require('../models/user.model');

module.exports = {
    signup: (req,res,next) => {
        delete req.body._id;
        const newUser = new user({ ...req.body });

        newUser.save().then(
            () => {
                res.status(201).json({ message: 'user signed up!'});
            }
        ).catch(error => res.status(500).json({ error }));
        
    },

    login: (req,res,next) => {
        user.findOne({ email: req.body.email })
            .then(val => {
                if(!val) {
                    return res.status(404).json({ error: new Error('user not found!') });
                }
                if(val.pass !== req.body.pass) {
                    return res.status(401).json({ error: new Error('wrong password!') });
                }
                res.status(200).json({ val });
            })
            .catch(error => res.status(500).json({ error }));
    }
}