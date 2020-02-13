/**
 * @Date:   2020-01-14T10:40:14+00:00
 * @Last modified time: 2020-02-12T18:28:03+00:00
 */
const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);


let Show = require('../models/Show');
let Episode = require('../models/Episode');

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
  Show.find({}).populate('episode')
       .then(shows => res.json(shows))
       .catch(err => res.status(400).json('Error' + err));
});

router.route("/").post(passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = getToken(req.headers)
  const show = req.body;

  if(token){
    if(!show.name){
      return res.status(400).json({
        message: "The show must be given a name"
      });
    }

    const newShow = new Show(show);

    newShow.save()
    .then(data => {
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
  const showId = req.params.id;

  Show.findById(showId)
      .then(result => {
        if(!result){
          return res.status(404).json({
            message: "Show not found with an ID " +showId
          });
        }
        res.json(result);
      }).catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).json({
            message: "Show not found with ID " + showId
          });
        }
        return res.status(500).json({
          message: "Error retrieving show with ID " + showId
        });
      });
});

router.route("/:id").put(passport.authenticate('jwt', { session: false}), (req, res) => {
  const token = getToken(req.headers);
  const showId = req.params.id;
  const newShow = req.body;

  if (token){
    if(!newShow.name){
      return res.status(400).json({
        message: "the show must be given a name"
      });
    }



  Show.findByIdAndUpdate(showId, newShow, {new: true})
      .then(show => {
        if(!show) {
          return res.status(404).json({
            message: "show not found with Id " + showId
          });
        }
        res.json(show);
          }).catch(err => {
            if(err.kind === 'ObjectId') {
              return res.status(404).json({
                message: "Tv show not found with ID " + showId
              });
            }

            return res.status(500).json({
              message: "Error updating show with ID " + showId
            });
          });
        }
        else {
          return res.status(403).json({success: false, message: 'Unauthorised'});
        }
    });

    router.route("review/:id").put((req, res) => {
      const showId = req.params.id;
      const newShow = req.body;


       Show.findByIdAndUpdate({_id: showId}, newShow, {new: true})
          .then(show => {

            if(!show) {
              return res.status(404).json({
                message: "show not found with Id " + showId
              });
            }
            console.log(show);
            res.json(show);
              }).catch(err => {
                console.log(newShow);
                if(err.kind === 'ObjectId') {
                  return res.status(404).json({
                    message: "Tv show not found with ID " + showId
                  });
                }

                return res.status(500).json({
                  message: "Error updating show with ID " + showId
                });
              });
        });

router.route("/:id").delete(passport.authenticate('jwt', { session: false}),(req, res) => {
  const token = getToken(req.headers);
  const showId = req.params.id;

  if(token){
    Show.findByIdAndRemove(showId)
        .then(show => {
          if(!show) {
            return res.status(404).json({
              message: "Tv Show not found with ID " + showId
            });
          }

          res.json({
            message: "You have successfully deleted a show"
          });
        }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NoutFound') {
            return res.status(404).json({
                message: "show not found with ID " + showId
            });
          }

          return res.status(500).send({
            message: "Could not delete show with Id " + showId
          });
        });
  }
  else {
    return res.status(403).json({success: false, message: 'Unauthorised'});
  }
});



module.exports = router;
