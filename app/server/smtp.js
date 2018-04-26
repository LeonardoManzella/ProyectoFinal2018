Meteor.startup(function () {
  process.env.MAIL_URL = `smtp://apikey:${Meteor.settings.sendGridAPIKey}@smtp.sendgrid.net:587`;
});
