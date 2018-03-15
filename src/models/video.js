var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var Video = new Schema({
  kind: {
    type: String,
    default: ''
  },
  etag: {
    type: String,
    unique: true
  },
  pageInfo: {
    type: Object,
    default: ''
  },
  items: {
    type: Array,
    default: [Items]
  }
});

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
    default: ''
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

Video.plugin(timestamps);
module.exports = mongoose.model('Video', Video);
