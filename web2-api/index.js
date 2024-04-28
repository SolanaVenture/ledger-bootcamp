const express = require('express');
const mongoose = require('mongoose');
const Kitten = require('./models/kitten');
const Organizer = require('./models/organizer');
const Bootcamp = require('./models/bootcamp');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
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

app.post('/bootcamp', (req, res) => {
  const bootcampData = req.body;
  const bootcamp = new Bootcamp(bootcampData);
  bootcamp
    .save()
    .then(() => {
      res.send('Bootcamp saved successfully');
    })
    .catch((err) => {
      console.error(err.message); // Print only the error message
      res.status(500).send('An error occurred');
    });
});

app.get('/bootcamps', (req, res) => {
  Bootcamp.find({})
    .then((bootcamps) => {
      res.json(bootcamps);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

app.get('/bootcamps/:owner', (req, res) => {
  const owner = req.params.owner;
  Bootcamp.find({ owner })
    .then((bootcamps) => {
      res.json(bootcamps);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
