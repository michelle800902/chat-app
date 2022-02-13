const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');

const app = express();
app.use(router);

// Initialize HTTP server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

// Setting socket io
const io = socketio(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        
        // if (error) {
        //     callback({ error: 'error' });
        // }
    });

    socket.on('disconnect', () => {
        console.log('User had left!!!');
    });
});
