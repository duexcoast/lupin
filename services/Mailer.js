const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);

module.exports = async (survey, template) => {
  const msg = {
    to: survey.recipients,
    from: 'conor.ux@gmail.com',
    subject: survey.subject,
    html: template,
    trackingSettings: {
      clickTracking: {
        enable: true,
      },
    },
  };

  try {
    const result = await sgMail.send(msg);
    console.log(result);
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(error.response.body);
    }
  }
};
