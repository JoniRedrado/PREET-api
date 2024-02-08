const server = require('./app.js');
const { conn } = require('./db.js');
const { PORT } = process.env

const findOrCreateData = require('./src/utils/dataDefaultPostgres.js');

conn.sync({ force: false }).then(() => {
  findOrCreateData();

  server.listen(PORT, () => {
    console.log('%s listening at', PORT);
  });
});
