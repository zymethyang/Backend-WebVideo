var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var BotChannel = new Schema({
  id: {
    type: String,
    unique: true
  }
});

BotChannel.plugin(timestamps);
module.exports = mongoose.model('BotChannel', BotChannel);
