const express = require('express');
const mongoose = require('mongoose');
const Kitten = require('./models/kitten');
const Organizer = require('./models/organizer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://chochinlu:${process.env.DB_PASSWORD}@cluster0.3t1d79w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// just for testing express
app.get('/hello-world', (req, res) => {
  res.send('Hello World from web2-api!');
});

// just for testing mongoose
app.get('/fluffy', (req, res) => {
  Kitten.findOne({ name: 'fluffy' })
    .then((kitten) => {
      if (kitten) {
        res.send(kitten.name);
      } else {
        res.send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

// get organiser information by wallet address
app.get('/organizer/:wallet_address', (req, res) => {
  const wallet_address = req.params.wallet_address;
  Organizer.findOne({ wallet_address })
    .then((organizer) => {
      if (organizer) {
        res.send(organizer);
      } else {
        res.send('Not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
