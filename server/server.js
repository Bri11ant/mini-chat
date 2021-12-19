const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3000;

app.set('post',port);

const server = http.createServer(app);

const io = require('./sockets/soket-io').listen(server);

server.listen(port, () => {
    console.log("listenning on:", port);
});