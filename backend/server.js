/**
 * @Date:   2020-01-13T09:46:53+00:00
 * @Last modified time: 2020-02-10T14:51:46+00:00
 */
const express =  require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const showsRouter = require('./routes/shows');
const episodesRouter = require('./routes/episodes');
const authRouter = require('./routes/auth');

const app = express();

app.use(body_parser.json());
app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
  res.json({message: "You are in the root route"});
});
app.use('/shows', showsRouter);
app.use('/episodes', episodesRouter);
app.use('/account', authRouter);



const port = 4000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
})
