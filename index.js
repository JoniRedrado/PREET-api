require('dotenv').config();
const { PORT } = process.env;
const { conn } = require('./db.js');
const httpServer = require('./src/webSocket/webSocket.js');
const findOrCreateData = require('./src/utils/dataDefaultPostgres.js');

conn.sync({ 
  //force: false
  //alter: true
  }).then(() => {
  findOrCreateData();

  // Utilizar el servidor de Socket.io en lugar del servidor HTTP original
  httpServer.listen(PORT, () => {
    console.log('%s listening at', PORT);
  });
});