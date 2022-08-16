const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, (req, res) => {
    //
  });

  app.post('/api/surveys', (req, res) => {
    //
  });

  app.post('/api/surveys/webhook', (req, res) => {
    //
  });
};
