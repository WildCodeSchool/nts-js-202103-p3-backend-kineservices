/* eslint-disable no-shadow */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/mysql');
const authJwt = require('./webToken');

const { JWT_AUTH_SECRET } = process.env;

router.post('/', authJwt, (request, response) => {
  const { email, password } = request.body;
  let user = {};
  if (!email || !password) {
    response
      .status(400)
      .send('Veuillez sasir votre mot de passe ou votre email');
  } else {
    pool.query(
      'SELECT * FROM user WHERE email = ?',
      [email],
      (error, results) => {
        if (error) {
          response.status(500).send(error);
        } else if (results.length === 0) {
          response.status(403).send(`invalid email`);
        } else {
          bcrypt.compare(
            password,
            results[0].password,
            (error, responseCrypted) => {
              if (responseCrypted) {
                const token = jwt.sign({ id: user.id }, JWT_AUTH_SECRET, {
                  expiresIn: 10000,
                });
                user = {
                  id: results[0].id,
                  email: results[0].email,
                  isConnected: responseCrypted, // true
                  auth: token,
                };
                response.status(200).send(user);
              } else if (error) {
                response.send(error);
              } else {
                response.status(403).send('Votre mot de passe est eronné');
                // renvoies false
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
