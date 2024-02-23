const ChatBot = require('../../mongoDB/models/ChatBot.js');

const getChatsByUser = async (userId) => {
    try{
        const chats = await ChatBot.findOne({userId});

        return chats ? chats : {record: [], chat: []};
    }catch(error){
        console.log(error.message);
        throw error;
    }
}

module.exports = getChatsByUser;