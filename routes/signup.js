/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.get('/', (request, response) => {
  console.log(request);
  pool.query('SELECT * FROM user', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.post('/', (request, response) => {
  // TODO : Valeurs de tests, a supprimer plus tard.
  const role_id = '1';
  const birthdate = '1983-02-05 00:00:00';
  // TODO : Valeurs de tests, a supprimer plus tard.
  const { formContent } = request.body;
  pool.query(
    'INSERT INTO user (firstname, lastname,birthdate, email, password, RPPS, SIRET, address, phone, country, website,role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      formContent.firstname,
      formContent.lastname,
      // formContent.picture,
      // formContent.birthdate,
      birthdate,
      formContent.email,
      formContent.password,
      formContent.RPPS,
      formContent.SIRET,
      formContent.address,
      formContent.phone,
      formContent.country,
      formContent.website,
      role_id,
    ],
    (error) => {
      if (error) {
        response.status(500).send('Error Creating new User');
        console.log(formContent);
        console.log(error);
      } else {
        response.status(200).send('User created');
        console.log(request.body);
        // console.log(result);
      }
    }
  );
});

module.exports = router;
