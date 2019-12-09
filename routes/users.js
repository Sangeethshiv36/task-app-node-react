const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Sign Up');
});

module.exports = router;
