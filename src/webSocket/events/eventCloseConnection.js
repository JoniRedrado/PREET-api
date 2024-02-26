const { closeThread } = require("../../utils/ChatOpenAI");

const event_CloseConnections = (socket, thread) => {
    socket.on("disconnect", () => {
        closeThread(thread)
        .then(response => console.log(`Thread eliminado ${response.id} => ${response.deleted}`))
        .catch(error => conosle.log(`Error eliminando el thread: ${error.message}`))

        //console.log(`Usuario desconectado: ${socket.id} - ${socket.userId}`);
    });
}

module.exports = event_CloseConnections;