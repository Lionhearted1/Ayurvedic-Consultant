const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { name, role, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      role,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ status: 'User registered', name: user.name }); // Status 201 for "Created"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed', message: error.message }); // Status 500 for "Internal Server Error" with an error message
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ status: 'Login successful', name: user.name }); // Status 200 for "OK"
  } else {
    res.status(401).json({ error: 'Login failed' }); // Status 401 for "Unauthorized"
  }
});

module.exports = router;
