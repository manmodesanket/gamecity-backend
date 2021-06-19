const mongoose = require('mongoose');

function initializeDBConnection () {
  const mongoKey = process.env['mongoSecret'];
  mongoose.connect(mongoKey, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.set('useFindAndModify', false);
}

module.exports = {initializeDBConnection};
