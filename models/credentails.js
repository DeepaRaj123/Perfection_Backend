const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const credentialsSchema = new Schema({

  accountSid: {
    type: String,
    required: false
  },
  authToken: {
    type: String,
    required: false
  },
  from: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('credentials', credentialsSchema,"credentials");
