const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

const chatRoutes = require('./routes/chat.route');
const userRoutes = require('./routes/user.route');

mongoose.connect('mongodb+srv://Brillant:lightmmongodb@cluster0.mj48v.mongodb.net\
/mini-chat-DB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connection au Mongodb établit!"))
    .catch((error) => console.error("Connection échouée! ", error));

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);

module.exports = app;