const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(201).send('User created');
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,         // User ID
          name: user.username,      // User name
          email: user.email     // User email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d', // Token valid for 30 days
        }
      );

      // Set token as HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true, // The cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie valid for 30 days
      });
      
      return res.json({ isOK: true, token });
    }

    return res.json({ isOK: false });
  } catch (error) {
    console.error('Error during login', error);
    return res.status(500).json({ isOK: false, message: 'Internal Server Error' });
  }
});

router.get('/profile', authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');  // Use decoded ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
