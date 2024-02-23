const prompt = require('../../utils/promtp');
const { OPENAI_API_KEY } = process.env;
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const event_ChatMessages = (socket, io) =>{
    socket.on('chat_message', async (data) => {
        const { userId } = socket; // Accede al ID del usuario desde el objeto socket
        
        //io.emit('chat_message', message);

        if(data === 'Inicia actividad chatBot'){
            io.emit('chat_message', '¡Hola! ¿En que te puedo ayudar?');
            return;
        }

        try{
            const { chatCompletion  } = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt}],
                model: "gpt-3.5-turbo",
            });

            io.emit('chat_message', chatCompletion.data.choices[0].message.content);
        }catch(error){
            console.log(error.message);
        }
    }); 
}

module.exports = event_ChatMessages;