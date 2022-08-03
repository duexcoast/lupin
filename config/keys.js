if (process.env.NODE_ENV === 'production') {
  //return prod set of keys
} else {
  module.exports = require('./dev');
}

