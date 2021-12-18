const express = require('express');

const http = require('http');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.set('post',port);

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

/********************************************/

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chat = require('./models/chat.model');

io.on('connection', client => {
    console.log('Socket.io connected!');
});

mongoose.connect('mongodb+srv://Brillant:lightmmongodb@cluster0.mj48v.mongodb.net\
/mini-chat-DB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connection au Mongodb établit!"))
    .catch((error) => console.error("Connection échouée! ", error));

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.post('/api/chats',(req,res,next) => {
    delete req.body._id;
    const newChat = chat({ ...req.body });
    const msg = "Chat inséré! " + newChat.message_chat;

    newChat.save().then(
        () => {
            res.status(201).json({ message: msg });
            io.emit('newChat', newChat);
            
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

/*******************************************/
server.listen(port, () => {
    console.log("listenning on:", port);
});