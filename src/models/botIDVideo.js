var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var BotIDVideo = new Schema({
  id: {
    type: String,
    unique: true
  }
});

BotIDVideo.plugin(timestamps);
module.exports = mongoose.model('BotIDVideo', BotIDVideo);
