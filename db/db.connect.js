const mongoose = require('mongoose');

function initializeDBConnection () {
  mongoose.connect('mongodb+srv://sankeman:ninja@1810@neog-cluster.blrhx.mongodb.net/buygames', { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.set('useFindAndModify', false);
}

module.exports = {initializeDBConnection};
