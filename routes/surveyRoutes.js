const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  // returns a list of surveys created by the current user
  app.get('/api/surveys', (req, res) => {});

  // creates a new survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split().map((email) => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    mailer(survey, surveyTemplate(survey));
  });

  // record feedback from a user
  app.post('/api/surveys/webhook', (req, res) => {
    //
  });
};
