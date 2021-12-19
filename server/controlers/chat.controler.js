const chat = require('../models/chat.model');

module.exports = {
    newChat : (req,res,next) => {
        delete req.body._id;
        const newChat = new chat({ ...req.body });
        const msg = "Chat inséré! " + newChat.message_chat;
    
        newChat.save().then(
            () => {
                res.status(201).json({ message: msg });
                
                console.log(msg);
            }
        ).catch(error => res.status(500).json({ error }));
    
    },

    getChats : (req,res,next) => {
        let chats = [];
        chat.find().then(
            val => {
                chats = val? val:[];
                res.status(200).json({ chats });
            }
        ).catch(error => res.status(500).json({ error }));
    }
}