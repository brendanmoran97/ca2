/**
 * @Date:   2020-01-14T10:25:09+00:00
 * @Last modified time: 2020-02-13T14:07:25+00:00
 */
const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  personname: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
});


const ShowSchema = mongoose.Schema({
  imdb_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  showRating: {
    type: String,
    required: true
  },
  episode:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode'
  }],
  review: [ReviewSchema]
});

module.exports = mongoose.model('Show', ShowSchema);
