const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

require('./models/User');
require('./models/Survey');
require('./services/passport');

const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

mongoose.connect(keys.MongoURI);

const app = express();

// The app.use function is used for mounting middleware functions at the specified path.
// Since path defautls to '/', middleware mounted without a path will be executed for
// every request to the app.

// app.use(bodyParser.json());

// Here we are mounting express-session to set up a cookie for passport, and using MongoStore
// to allow us to use our mongodb as a session store for the cookies.
app.use(bodyParser.json());
app.use(
  session({
    secret: [keys.cookieKey],
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: 'sessions',
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 10,
    }),
  })
);

// This is setting up passport to use our cookie.
app.use(passport.initialize());
app.use(passport.session());

// initializing imported routes on the `app` instance
surveyRoutes(app);
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/dist'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('listening');
});
