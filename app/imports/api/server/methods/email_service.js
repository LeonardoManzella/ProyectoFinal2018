
import _ from 'lodash';
const EMAIL_FROM = 'emprendimientoscreativos@gmail.com';

let emailService = Email.send;

export const sendEmail = function(to, subject, text) {
  if (Meteor.isServer) {
    emailService({ from: EMAIL_FROM, to, subject, text });
  }
};

export const configure = function(newEmailService) {
  emailService = newEmailService;
};
