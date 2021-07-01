const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.get('/', function (request, response) {
  pool.query('SELECT * FROM category', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
