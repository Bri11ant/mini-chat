const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    pseudo: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    pass: { type: 'string', required: true },
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);