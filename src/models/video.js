var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var Items = new Schema({
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
    default: '',
    unique:true
  },
  snippet: {
    type: Object,
    default: {}
  },
  contentDetails: {
    type: Object,
    default: {}
  },
  status: {
    type: Object,
    default: {}
  },
  statistics: {
    type: Object,
    default: {}
  }
})

var Video = new Schema({
  kind: {
    type: String,
    default: ''
  },
  etag: {
    type: String,
    default: ''
  },
  pageInfo: {
    type: Object,
    default: ''
  },
  items: {
    type: [Items],
  }
});


Video.plugin(timestamps);
module.exports = mongoose.model('Video', Video);
