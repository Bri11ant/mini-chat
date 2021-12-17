const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const chat = require('./models/chat.model');

const app = express();

/*
    CHAT SAMPLE
 *
    let chats = [
        {
            writer_chat: 'Jhonny',
            message_chat: `Hi everyone`,
            date_chat: new Date
        },
        {
            writer_chat: 'Kevin',
            message_chat: `Hi Jhonny`,
            date_chat: new Date
        },
        {
            writer_chat: 'Jhonny',
            message_chat: `I'm from england and you?`,
            date_chat: new Date
        },
        {
            writer_chat: 'Kevin',
            message_chat: `I'm from Madagascar`,
            date_chat: new Date
        },
        {
            writer_chat: 'Brillant',
            message_chat: `Za koa avy any madagascar!`,
            date_chat: new Date
        },
    ];
 *
 *
 */

mongoose.connect('mongodb+srv://Brillant:lightmmongodb@cluster0.mj48v.mongodb.net\
/mini-chat-DB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connection au Mongodb établit!"))
    .catch((error) => console.error("Connection échouée! ", error));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept,\
Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/chats',(req,res,next) => {
    delete req.body._id;
    const newChat = chat({ ...req.body });
    const msg = "Chat inséré! " + newChat.message_chat;

    newChat.save().then(
        () => {
            res.status(201).json({ message: msg });
            console.log(msg);
        }
    ).catch(error => res.status(500).json({ error }));

});

app.get('/api/chats',(req,res,next) => {
    let chats = [];
    chat.find().then(
        val => {
            chats = val? val:[];
            res.status(200).json({ chats });
        }
    ).catch(error => res.status(500).json({ error }));
});

module.exports = app;