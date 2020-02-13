/**
 * @Date:   2020-01-27T09:03:49+00:00
 * @Last modified time: 2020-02-11T18:17:35+00:00
 */
 const mongoose = require('mongoose');
 let Show = require('./Show');


const EpisodeSchema = mongoose.Schema({
   showId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Show',
     required: true
   },
   name:{
     type: String,
     required: true
   },
   episode_length: {
     type: Number,
     required: true
   },
   description: {
     type: String,
     required: true
   },
   season_number: {
     type: Number,
     required: true
   },
   episode_number: {
     type: Number,
     required: true
   }

 });

 module.exports = mongoose.model('Episode', EpisodeSchema);
