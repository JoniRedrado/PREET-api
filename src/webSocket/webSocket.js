const onConnection = require('./events/eventConnection.js');
const conn = require('../mongoDB/db.js');
const { createServer } = require('http');
const { Server } = require('socket.io');
const server = require('../../app.js');

const mongoDb = {status: false};

conn().then(() => {
    mongoDb.status = true;
    console.log('Mongo connected');
});

const httpServer = createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

onConnection(io);

module.exports = httpServer;