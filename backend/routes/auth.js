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
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/register');
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
