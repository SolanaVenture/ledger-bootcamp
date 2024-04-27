require('dotenv').config();
const readline = require('readline');
const mongoose = require('mongoose');
const Organizer = require('./models/organizer');

const connectToDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://chochinlu:${process.env.DB_PASSWORD}@cluster0.3t1d79w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const main = async () => {
  await connectToDb();
  const name = await askQuestion('Enter name: ');
  const wallet_address = await askQuestion('Enter wallet address: ');
  const organizer = new Organizer({ name, wallet_address });
  try {
    await organizer.save();
    console.log('Organizer saved to database');
  } catch (err) {
    console.error('Could not save organizer to database', err);
  }

  // Query all organizers and print them
  try {
    const organizers = await Organizer.find();
    console.log('All organizers:');
    organizers.forEach((organizer) => {
      console.log(
        `Name: ${organizer.name}, Wallet Address: ${organizer.wallet_address}`
      );
    });
  } catch (err) {
    console.error('Could not retrieve organizers from database', err);
  }

  rl.close();
  mongoose.connection.close();
};

main();
