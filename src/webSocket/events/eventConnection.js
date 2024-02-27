const socketAuth = require('../authSocket.js');
const { getThread } = require('../../utils/ChatOpenAI.js');
const event_CloseWindow = require('./eventCloseWindow.js');
const event_ChatMessages = require('./eventChatMessage.js');
const event_CloseConnections = require('./eventCloseConnection.js');
const getChatsByUser = require('../../mongoDB/controllers/getChatsByUser.js');

const onConnection = (io) => {
    io.on('connection', (socket) => {
        const token = socket.handshake.auth.token   
        const auth = socketAuth(token);

        if(auth){
            socket.userId = auth
            
            event_CloseWindow(socket);

            getThread()
            .then(threadCreate =>{
                event_ChatMessages(socket, threadCreate, io);
                event_CloseConnections(socket, threadCreate);
            }).catch(error => console.log(error.message))
            

            getChatsByUser(auth).then(data => {
                console.log(data);
                io.emit('set_Chats', data);
            }).catch(error => {
                io.emit('error_Chat', error.message);
            })

            console.log(`a user has conected: ${socket.id} - ${socket.userId}`);   
        }else{
            io.emit('chat_message', 'Token Invalid');
            socket.disconnect();
        }
    })
}

module.exports = onConnection;