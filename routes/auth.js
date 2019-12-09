const db = require('../db.json');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db);
});

router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
