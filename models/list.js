const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ListItem',
    },
  ],
  dateCreated: { type: Date, default: Date.now },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
