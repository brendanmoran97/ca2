/**
 * @Date:   2020-01-13T09:46:53+00:00
 * @Last modified time: 2020-01-13T12:24:45+00:00
 */
const express =  require('express');
const body_parser = require('body-parser');
const app = express();

app.use(body_parser.json());

let data = require('./movies.json');

app.get('/movies', (req, res) => {
  res.json(data);
});

app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const movie = data.find(_movie => _movie.id === movieId);

  if(movie){
    res.json(movie);
  }
  else{
    res.json({ message:  `Movie ${movieId} doesnee exist`})
  }

  res.json(data);
});

app.post("/movies", (req, res) => {
  const movie = req.body;
  console.log('Adding new movie: ', movie);
  data.push(movie);

  res.json(data);
});

app.put("/movies/:id", (req, res) => {
  const movieId = req.params.id;
  const movie = req.body;

  console.log("Editing Movie: " + movieId + " to be " + movie);

  const updatedList = [];



  data.forEach((oldMovie, index) => {
    if(oldMovie.id === movieId){
      data[index] = movie;
    }
  });
  res.json(data);
});

app.delete("/movies/:id", (req, res) => {
  const movieId = req.params.id;

  console.log("Deleting Movie: " + movieId + " to be " + movie);

  const filtered_list = data.filter(movie => movie.id !== movieId);

  data = filtered_list;

  res.json(data);
});


// app.get('/json', (req, res) => {
//   res.json({message: 'Hello World'});
// });
//
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

const port = 4000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
})
