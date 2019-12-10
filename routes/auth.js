const db = require('../db.json');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db.find(data => data.email === email);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      console.log(user);
      console.log(user.password);
      const pwdMatch = await bcrypt.compare(password, user.password);

      if (!pwdMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 50000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const user = await db.find(data => data.id === req.user.id);
    const userResponseObject = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      country: user.country,
      gender: user.gender,
      email: user.email
    };
    res.json(userResponseObject);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
