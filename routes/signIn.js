/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { email, password } = request.body;
  const isConnected = [];
  pool.query(
    'SELECT * FROM user WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        response.send(error);
      } else {
        // response.status(200).send(results[0].id);
        bcrypt.compare(
          password,
          results[0].password,
          (error, responseCrypted) => {
            // compare le mot de passe de la db,
            if (responseCrypted) {
              isConnected.push(responseCrypted, results[0].id);
              response.status(200).send(isConnected);
              //  renvoies true + id
            } else if (error) {
              response.send(error);
            } else {
              response.status(403).send('Votre mot de passe est eronné');
              // renvoies false
            }
            // response.status(200).send(res, results[0].id);
          }
        );
      }
    }
  );
});

module.exports = router;
