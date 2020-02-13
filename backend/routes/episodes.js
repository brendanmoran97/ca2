/**
 * @Date:   2020-01-14T10:40:14+00:00
 * @Last modified time: 2020-02-11T11:11:14+00:00
 */
const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);


let Episode = require('../models/Episode');
let Show = require('../models/Show');

const getToken = (headers) => {
  if (headers && headers.authorization){
    var parted = headers.authorization.split(' ');
    if(parted.length === 2){
      return parted[1];
    }
    else {
      return null;
    }
  }
  else {
    return null;
  }
};

router.route('/').get((req, res) => {
  Episode.find().populate('shows')
       .then(episodes => res.json(episodes))
       .catch(err => res.status(400).json('Error' + err));
});

router.route("/").post(passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = getToken(req.headers)
  const episode = req.body;

  if(token){
    if(!episode.name){
      return res.status(400).json({
        message: "The episode must be given a name"
      });
    }

    const newEpisode = new Episode(episode);

    newEpisode.save()
    .then(data => {
      Show.findOne({_id: req.body.showId}, (error, s) => {
        s.episode.push(newEpisode._id);
        s.save();
      });
      res.json(data);

    })
    .catch(err => res.status(400)
    .json(
      'Error: ' + err
    ));
  }
  else{
    return res.status(403).json({
      success: false,
      message: 'Unauthorised'
    });
  }


});

router.route("/:id").get((req, res) => {
  const episodeId = req.params.id;

  Episode.findById(episodeId)
      .then(result => {
        if(!result){
          return res.status(404).json({
            message: "Episode not found with an ID " +episodeId
          });
        }
        res.json(result);
      }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({
            message: "Episode not found with ID " + episodeId
          });
        }
        return res.status(500).json({
          message: "Error retrieving episode with ID " + episodeId
        });
      });
});

router.route("/:id").put(passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  const episodeId = req.params.id;
  const newEpisode = req.body;

  if (token){
    if(!newEpisode.name){
      return res.status(400).json({
        message: "the episode must be given a name"
      });
    }



  Episode.findByIdAndUpdate(episodeId, newEpisode, {new: true})
      .then(episode => {
        if(!episode) {
          return res.status(404).json({
            message: "episode not found with Id " + episodeId
          });
        }
        res.json(episode);
          }).catch(err => {
            if(err.kind === 'ObjectId') {
              return res.status(404).json({
                message: "Tv episode not found with ID " + episodeId
              });
            }

            return res.status(500).json({
              message: "Error updating episode with ID " + episodeId
            });
          });
        }
        else {
          return res.status(403).json({success: false, message: 'Unauthorised'});
        }
    });


    router.route("/episodes/create/:id").put(passport.authenticate('jwt', { session: false}), (req, res) => {
      const token = getToken(req.headers);
      const episodeId = req.params.id;
      const newEpisode = req.body;

      if (token){
        // if(!newEpisode.name){
        //   return res.status(400).json({
        //     message: "the episode must be given a name"
        //   });

          // Episode.findById(episodeId)
          //   .then((episode) => {
          //
          //     let episode = episode.episode;
          //     console.log(episode); episode.push(newEpisode);
          //     console.log(episode);
          //     episode.episode = episode;
          //     episode.save(); });




          }
            else {
              return res.status(403).json({success: false, message: 'Unauthorised'});
            }
        });

router.route("/:id").delete(passport.authenticate('jwt', { session: false}),(req, res) => {
  const token = getToken(req.headers);
  const episodeId = req.params.id;

  if(token){



    Episode.findByIdAndRemove(episodeId)
        .then(episode => {
          if(!episode) {
            return res.status(404).json({
              message: "Tv Episode not found with ID " + episodeId
            });
          }

          // Show.episode.remove();
          // Show.findOne().episode.id(episodeId).remove();
          // Show.save(function (err) {
          //   if (err) return handleError(err);
          //   console.log('the subdocs were removed');
          // });


          Show.findOne({_id: episode.showId}, (error, s) => {
            console.log("before");
            console.log(s);
            s.episode.pull(episodeId);
            console.log("after");
            console.log(s);
            s.save(function (err) {
              if (err) return handleError(err);
              console.log('the subdocs were removed');
            });
          });






          res.json({
            message: "You have successfully deleted a episode"
          });

          // this.children.pull(_id)

        }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NoutFound') {
            return res.status(404).json({
                message: "episode not found with ID " + episodeId
            });
          }

          return res.status(500).send({
            message: "Could not delete episode with Id " + episodeId
          });
        });
  }
  else {
    return res.status(403).json({success: false, message: 'Unauthorised'});
  }
});



module.exports = router;
