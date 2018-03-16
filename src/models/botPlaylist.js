var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var BotPlaylist = new Schema({
  kind: {
    type: String,
    default: ''
  },
  etag: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    unique: true
  },
  snippet: {
    type: Object,
    default: {}
  }
});

BotPlaylist.plugin(timestamps);
module.exports = mongoose.model('BotPlaylist', BotPlaylist);
