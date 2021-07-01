/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { email, password } = request.body;
  pool.query(
    'SELECT * FROM user WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        response.send(error);
      } else {
        bcrypt.compare(password, results[0].password, (error, res) => {
          if (res) {
            response.send(res);
          } else if (error) {
            response.status(500).send(error);
          } else {
            response.send(res);
          }
        });
      }
    }
  );
});

module.exports = router;
