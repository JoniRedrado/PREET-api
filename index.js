const server = require('./app.js');
const { conn } = require('./db.js');
const { PORT } = process.env;
const http = require('http');
const socketIo = require('socket.io');
const findOrCreateData = require('./src/utils/dataDefaultPostgres.js');

const httpServer = http.createServer(server);
const io = socketIo(httpServer, {
  cors: {
    origin: '*',
  },
});

// Agregar eventos de conexión para Socket.io
io.on('connection', (socket) => {
  console.log('Se ha conectado un cliente');

  socket.broadcast.emit('chat_message', {
      usuario: 'INFO',
      mensaje: 'Se ha conectado un nuevo usuario'
  });

  socket.on('chat_message', (data) => {
      io.emit('chat_message', data);
  });
});

conn.sync({ force: false }).then(() => {
  findOrCreateData();

  // Utilizar el servidor de Socket.io en lugar del servidor HTTP original
  httpServer.listen(PORT, () => {
    console.log('%s listening at', PORT);
  });
});