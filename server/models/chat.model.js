const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    writer_chat: { type: {
                            email: '', pseudo: '', pass: ''
                        }, required: true },
    message_chat: { type: String, required: true },
    date_chat: { type: Date, required: true },
});

module.exports = mongoose.model('Chat', chatSchema);