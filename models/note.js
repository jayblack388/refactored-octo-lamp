const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  text: { type: String, required: true },
  listItemId: { type: Schema.Types.ObjectId, ref: 'ListItem', required: true },
  dateCreated: { type: Date, default: Date.now },
  isComplete: { type: Boolean, required: true, default: false },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
