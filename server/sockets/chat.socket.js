const chat = require('../models/chat.model');

module.exports.start = (broadcast,socket) => {
    const updateChat = () => {
        chat.find().then((val => {
            let chats = val? val:[];
            broadcast.emit('update chats', chats);
        }))
        .catch(error => console.error('Erreur!', error));
    }

    chat.find().then((val => {
        let chats = val? val:[];
        socket.emit('update chats', chats);
    }))
    .catch(error => console.error('Erreur!', error));

    socket.on('new chat', updateChat);

    console.log('Socket.io connected!');
}