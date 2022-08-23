const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const mailer = require('../services/Mailer');

  const Survey = mongoose.model('surveys');

module.exports = (app) => {
  // returns a list of surveys created by the current user
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  // creates a new survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subj ect,
      body,
      // recipients: recipients.split().map((email) => ({
      //   email: email.trim(),
      // })),
      recipients: recipients.map((email) => ({
        email: email.trim(), 
      })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try {
      await mailer(survey, surveyTemplate(survey));
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // record feedback from a user
  app.post('/api/surveys/webhook', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        if (email === 'example@test.com') return;
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, ...match };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          // find the record
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          // update the record
          {
            // increment the [choice] prop (yes or no), by one
            $inc: { [choice]: 1 },
            // set the responded prop of the recipient we just found above to true
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
