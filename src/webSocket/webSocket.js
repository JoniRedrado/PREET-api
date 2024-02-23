const socketAuth = require('./authSocket.js');
const { createServer } = require('http');
const { Server } = require('socket.io');
const server = require('../../app.js');

const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
    const token = socket.handshake.auth.token   
    const auth = socketAuth(token);

    auth ? socket.userId = auth : socket.disconnect();
    console.log(`a user has conected: ${socket.id} - ${socket.userId}`);    

    socket.on('chat_message', (data) => {
        const { userId } = socket; // Accede al ID del usuario desde el objeto socket
        const message = {
            data: data.message,
            rol: 'user'
        }
        
        io.emit('chat_message', message);
    }); 

    socket.on('closeWindow', () => {
        console.log("close window");
        socket.disconnect()
    }); 

    socket.on("disconnect", () => {
        console.log(`Usuario desconectado: ${socket.id} - ${socket.userId}`);
    });
});

module.exports = httpServer;