const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
