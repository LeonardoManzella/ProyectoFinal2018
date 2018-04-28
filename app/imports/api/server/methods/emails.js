
import _ from 'lodash';
import { sendEmail } from './email_service';

const getEmailTemplate = function(lang = 'es', templateName, valuesToReplace) {
  const templatePath = 'templates/' + lang + '/' + templateName + '.html';
  let emailTemplate = Assets.getText(templatePath);
  Object.keys(valuesToReplace).forEach((key) => {
    emailTemplate = _.replace(emailTemplate, key, valuesToReplace[key]);
  });
  return emailTemplate;
};

export const sendEnrollmentLinkEmail = function(to, userName, refcode) {
  const enrollmentLink = Meteor.absoluteUrl() + 'confirmRegistration/' + refcode;
  const html = getEmailTemplate('es', 'enrollment', {userName, enrollmentLink});
  sendEmail(to, 'Emprendimientos creativos!', html);
};

export const sendWelcomeEmail = function(to, userName) {
  console.log('[sendWelcomeEmail] - Starting with params', to, userName);
  const home = Meteor.absoluteUrl();
  const html = getEmailTemplate('es', 'welcome', {userName, home});
  sendEmail(to, 'Bienvenido a emprendimientos creativos!', html);
};
