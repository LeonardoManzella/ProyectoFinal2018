// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
//TODO Change later to ENV using:
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env

// Leyendo https://forums.meteor.com/t/sendgrid-examples/19965/4, me parece que hay que rehacerlo para usar una meteor call
sgMail.setApiKey('TODO API KEY');
const msg = {
  to: 'leonardo.manzella@gmail.com',
  from: 'leonardo.manzella@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);