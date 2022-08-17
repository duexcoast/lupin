const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);

module.exports = async ({ subject, recipients }, template) => {
  const msg = {
    personalizations: recipients.map((email) => ({ to: [email] })),
    from: 'duex.coast@gmail.com',
    subject: subject,
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
    return result;
  } catch (err) {
    console.log(err);
    if (err.response) {
      console.error(error.response.body);
    }
  }
};
