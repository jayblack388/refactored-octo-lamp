const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: {type: String, required: true },
  date: {type: Date, default: Date.now }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;