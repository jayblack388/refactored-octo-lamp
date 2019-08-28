const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  _id: { type: String, required: true },
  url: { type: String, required: true },
  fileName: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateCreated: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
