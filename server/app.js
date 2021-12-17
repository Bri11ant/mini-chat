const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
    CHAT SAMPLE
*/
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
/*
 *
 */

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
    const newChat = { ...req.body };
    chats.push(newChat);
    const msg = "Chat inséré! " + newChat.message_chat;

    res.status(201).json({ message: msg });
    console.log(msg);
});

app.get('/api/chats',(req,res,next) => {
    res.status(200).json({ chats });
});

module.exports = app;