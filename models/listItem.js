const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listItemSchema = new Schema({
  title: { type: String, required: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
  dateCreated: { type: Date, default: Date.now },
});

const ListItem = mongoose.model('ListItem', listItemSchema);

module.exports = ListItem;
