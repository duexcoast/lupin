const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendGridKey);
module.exports = async (body, subject, recipients) => {
  const msg = {
    to: recipients,
    from: 'conor.ux@gmail.com',
    subject: subject,
    html: body,
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
