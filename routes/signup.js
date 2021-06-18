/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.get('/', (request, response) => {
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.post('/', (request, response) => {
  const { formContent } = request.body;
  // cryptage du mot de passe
  bcrypt.hash(formContent.password, 10, (error, hash) => {
    if (error) {
      console.log(`bcrypt error ${error}`);
    } else {
      pool.query(
        'INSERT INTO user (firstname, lastname, birthdate, email, password, RPPS, SIRET, address, phone, country, website, role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          formContent.firstname,
          formContent.lastname,
          // formContent.picture,
          formContent.birthdate,
          formContent.email,
          hash,
          formContent.RPPS,
          formContent.SIRET,
          formContent.address,
          formContent.phone,
          formContent.country,
          formContent.website,
          formContent.role_id,
        ],
        // eslint-disable-next-line no-shadow
        (error) => {
          if (error) {
            response.status(500).send(`Error Creating new User${error}`);
          } else {
            response.status(200).send('User created');
          }
        }
      );
    }
  });
});
module.exports = router;
