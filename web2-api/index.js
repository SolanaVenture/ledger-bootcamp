const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model('Kitten', kittySchema);

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
