const { sendMessage } = require('../../utils/ChatOpenAI');

const event_ChatMessages = (socket, thread, io) =>{
    socket.on('chat_message', data => {
        const { userId } = socket; // Accede al ID del usuario desde el objeto socket

        if(data === 'Inicia actividad chatBot'){
            io.emit('chat_message', '¡Hola! ¿En que te puedo ayudar?');
            return;
        }

        io.emit('chat_wait_response', '');

        sendMessage(thread, data)
        .then(message => {
            io.emit('chat_message', message);
        }).catch(error => {
            console.log(`Error enviando el mensaje a bot: ${error.message}`);
            io.emit('error_Chat', error.message);
        })   
    }); 
}

module.exports = event_ChatMessages;