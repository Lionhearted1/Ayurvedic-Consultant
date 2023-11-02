const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validationResult } = require('express-validator');

router.post('/register', async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, role, email, password } = req.body;

    // Check if the email is a valid email address
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      role,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ status: 'User registered', name: user.name });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
});

function isValidEmail(email) {
  // You can use a regular expression or a library like validator.js to validate email addresses.
  // Here's a simple regular expression example:
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}



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
