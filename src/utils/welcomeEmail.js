const sgMail = require('@sendgrid/mail');

module.exports = welcomeEmail = (apiKey, to, html) => {
    
    sgMail.setApiKey(apiKey);
    const msg = {
        to,
        from: 'contacto.preet@gmail.com', // Use the email address or domain you verified above
        subject: 'Welcome to PREET',
        html,
    };

    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);
    
            if (error.response) {
            console.error(error.response.body)
            }
        });
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