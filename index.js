const server = require('./app.js');
const { conn } = require('./db.js');
const { PORT, SECRET_KEY} = process.env;
const http = require('http');
const socketIo = require('socket.io');
const findOrCreateData = require('./src/utils/dataDefaultPostgres.js');
const jwt = require('jsonwebtoken'); // Importa la biblioteca JWT

const httpServer = http.createServer(server);
const io = socketIo(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('authenticate', ({ token }) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY); // Verifica y decodifica el token
      socket.userId = decoded.id; // Asigna el ID del usuario al objeto socket
    } catch (err) {
      console.error('Authentication error:', err.message);
    }
  });

  socket.on('chat message', (data) => {
    const { userId } = socket; // Accede al ID del usuario desde el objeto socket
    const { message } = data;
    // Haz lo que necesites con el ID del usuario (por ejemplo, guardar el mensaje en la base de datos asociado al usuario)
    io.emit('chat message', message);
  });
});

conn.sync({ force: true }).then(() => {
  findOrCreateData();

  // Utilizar el servidor de Socket.io en lugar del servidor HTTP original
  httpServer.listen(PORT, () => {
    console.log('%s listening at', PORT);
  });
});