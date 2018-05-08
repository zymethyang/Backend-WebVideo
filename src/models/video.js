var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;



var Video = new Schema({
  media: {
    type: Number,
    default: 1
  },
  token: {
    type: String,
    default: null
  },
  pub: {
    type: Number,
    default: 1
  },
  private: {
    type: Number,
    default: 0
  },
  user_id: {
    type: Number,
    default: null
  },
  date: {
    type: String,
    default: ''
  },
  featured: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    default: null
  },
  tmp_source: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: 'Chưa có tiêu đề'
  },
  thumb: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: 'Chưa có mô tả'
  },
  category: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  liked: {
    type: Number,
    default: 0
  },
  disliked: {
    type: Number,
    default: 0
  },
  nsfw: {
    type: Number,
    default: 0
  },
  embed: {
    type: String,
    default: null
  },
  remote: {
    type: String,
    default: null
  },
  srt: {
    type: String,
    default: null
  },
  privacy: {
    type: Number,
    default: 0
  }
});


Video.plugin(timestamps);
module.exports = mongoose.model('vibe_video', Video);
