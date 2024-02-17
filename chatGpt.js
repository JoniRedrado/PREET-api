// const {OpenAI} = require('openai');
// const openai = new OpenAI({api:'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', org:'org-mZ9Si81VIde6SpWriuv3JoDP'});
// // apiKey: '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',
// // organization: 'org-mZ9Si81VIde6SpWriuv3JoDP',

// // const apiKey = new OpenAI("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");
// //org-mZ9Si81VIde6SpWriuv3JoDP
// // const orgId = "org-mZ9Si81VIde6SpWriuv3JoDP";
// // const openai = new OpenAIAPI(configuration)
// // const openai = new OpenAI(apiKey, orgId);
// async function sendMessage(message) {
//     try {
//       console.log('Enviando mensaje a ChatGPT:', message);
//       const response =  await openai.c({
//         engine: 'text-davinci-003',
//         prompt: message,
//         max_tokens: 5,
//     });
  
//       const botResponse = response.data.choices[0].text.trim();
//       console.log('Respuesta de ChatGPT:', botResponse);
//       return botResponse;
//     } catch (error) {
//       console.error('Error en sendMessage:', error.message);
//       return 'Lo siento, no pude entender la solicitud.';
//     }
//   }

// module.exports = {
//   sendMessage,
// };