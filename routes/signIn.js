const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.get('/', (request, response) => {
  const results = request;
  console.log(results);
  pool.query('SELECT * FROM user ', (error, results) => {
    results.map((result) => {
      console.log(result.email, result.password);
    });

    if (error) {
      // console.log(error);
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
