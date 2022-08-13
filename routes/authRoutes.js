const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // User is returning from Google OAuth with an authentication code.
  app.get(
    '/auth/google/callback',
    // this uses passport to send the code received from the uri back to google in return for the user
    //information object
    passport.authenticate('google'),
    // after we get the object we want to redirect the user to '/surveys', so we'll use a second callback.
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // this logout fn is attached to the request object automatically by passport
    // it takes the cookie that contains our user's id, and kills the id currently in the cookie.
    // passport v0.6 now implements logout() as an async fn, that you can use for error handling.
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    // this will send the user object back, which should be undefined.
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
