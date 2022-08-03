const passport = require('passport');
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  // User is returning from Google OAuth with an authentication code.
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // this logout fn is attached to the request object automatically by passport
    // it takes the cookie that contains our user's id, and kills the id that's in there.
    // passport v0.6 now implements logout() as an async fn, that you can use for error handling.
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    // this will send the user object back, which should be undefined.
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
