const soket_io = require('socket.io');

module.exports.listen = (server) => {
    io = soket_io(server,  { cors: { origin: '*' } });
    
    io.on('connection', socket => {
        require('./chat.socket').start(io,socket);
    })
}