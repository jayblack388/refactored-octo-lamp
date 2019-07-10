const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  listKey: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  list: [{ type: Schema.Types.ObjectId, ref: 'ListItem', required: true }],
  dateCreated: { type: Date, default: Date.now },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
