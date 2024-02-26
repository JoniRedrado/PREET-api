const { OPENAI_API_KEY } = process.env;
const OpenAI = require('openai');

const openai = new OpenAI ({
    apiKey: OPENAI_API_KEY
});

const getThread = async () => {
    try{
        const emptyThread = await openai.beta.threads.create();
        return emptyThread;
    }catch(error){
        throw error;
    }
}

const closeThread = async (thread) => {
    try{
        const response = await openai.beta.threads.del(thread.id);
        return response;
    }catch(error){
        throw error;
    }
}

const createMessage = async (thread, message) => {
    try{
        const addMessage = await openai.beta.threads.messages.create(
            thread.id,
            {role:'user', content: message}
        )
    }catch(error){
        throw error;
    }
}

const runThread = async (thread) => {
    try{
        const run = await openai.beta.threads.runs.create(
            thread.id,
            {assistant_id: 'asst_yM6aXYT1FTGMCtJLkhA7o9TF'}
        )
    
        return run;
    }catch(error){
        throw error;
    }
}

const sendMessage = async (thread, message) => {
    try{
        await createMessage(thread, message);
        const run = await runThread(thread);

        let running = 0;

        do{
            const runStatus = await openai.beta.threads.runs.retrieve(thread.id,run.id)
            await new Promise(resolve => setTimeout(resolve, 1000));

            running++;
            if(running > 10){
                await openai.beta.threads.runs.cancel(thread.id, run.id);
                return "No puedo responder a la pregunta, porfavor formulela de otra forma";
            }

            if(runStatus.status === 'completed') break;
        }while(true);

        const listMessages = await openai.beta.threads.messages.list(thread.id);
        return listMessages.data[0].content[0].text.value;  
    }catch(error){
        throw error;
    }
}

module.exports = {
    getThread,
    sendMessage,
    closeThread
}