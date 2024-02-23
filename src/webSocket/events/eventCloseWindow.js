
const event_CloseWindow = (socket) => {
    socket.on('closeWindow', () => {
        socket.disconnect();
    }); 
}

module.exports = event_CloseWindow;