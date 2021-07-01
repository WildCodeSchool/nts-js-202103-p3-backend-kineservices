const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.get('/', (request, response) => {
  const res = request;
  console.log(res);
  pool.query('SELECT * FROM user ', (error, results) => {
    results.map((result) => {
      return console.log(result.email, result.password);
    });

    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
