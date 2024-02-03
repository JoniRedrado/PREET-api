const sgMail = require('@sendgrid/mail');
const ejs = require('ejs')
const fs = require('fs').promises

const renderEJSFile = async (filePath, data) => {
  try {
    const ejsContent = await fs.readFile(filePath, 'utf-8')
    return ejs.render(ejsContent, {name:data})
  } catch (error) {
    throw new Error(`Error loading or rendering EJS file: ${error.message}`);
  }
}

module.exports = welcomeEmail = async (apiKey, to, name) => {
  sgMail.setApiKey(apiKey);
  
  try {
    const html = await renderEJSFile(__dirname + '/../emails/welcome.ejs', name)
    
    const msg = {
        to,
        from: 'contacto.preet@gmail.com',
        subject: 'Welcome to PREET',
        html,
    };

    await sgMail.send(msg)

  } catch (error) {
    console.error(error)
    
  }

    // sgMail
    //     .send(msg)
    //     .then(() => {console.log('enviado')}, error => {
    //         console.error(error);
    
    //         if (error.response) {
    //         console.error(error.response.body)
    //         }
    //     });
}

//module.exports = welcomeEmail

//ES6
//ES8
/*(async () => {
  try {l.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();*/