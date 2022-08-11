// We want this to have property names that match our dev keys, but tell Heroku to use Heroku
// environment variables
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  MongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
};
w