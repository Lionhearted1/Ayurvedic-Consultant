const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const medicineRoutes = require('./routes/medicine');
const authRoutes=require('./routes/auth')
const session = require('express-session');
const bcrypt = require('bcrypt');


const dbUrl = 'mongodb://localhost:27017/ayu';
// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Connection error:', error);
  }
}


connectToDatabase();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use('/medicines', medicineRoutes);
app.use('/auth', authRoutes);

app.listen(3002, function () {
  console.log('Server is running on port 3002');
});
