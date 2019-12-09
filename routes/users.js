const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../db.json');
const fs = require('fs');
const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('first_name', 'First Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter an password with 8 or more characters'
    ).isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    const {
      first_name,
      last_name,
      gender,
      country,
      email,
      password
    } = req.body;

    try {
      let user = await db.some(data => data.email === email);

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = {
        id: Math.floor(Math.random() * 21) + 150,
        first_name,
        last_name,
        email,
        gender,
        password,
        country
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      db.push(user);

      fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Adding User....');
      });

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

module.exports = router;
