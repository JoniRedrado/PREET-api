
const event_CloseConnections = (socket) => {
    socket.on("disconnect", () => {
        //console.log(`Usuario desconectado: ${socket.id} - ${socket.userId}`);
    });
}

module.exports = event_CloseConnections;