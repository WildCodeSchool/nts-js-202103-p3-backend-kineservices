/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');
// router.use(express.json());

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
  const { formContent } = request.body;
  pool.query(
    'INSERT INTO user (firstname, lastname, picture, birthdate, email, password, RPPS, SIRET, address, phone, country, website) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [
      formContent,
      //   formContent.firstname,
      //   formContent.lastname,
      //   // formContent.picture,
      //   formContent.birthdate,
      //   formContent.email,
      //   formContent.password,
      //   formContent.RPPS,
      //   formContent.SIRET,
      //   formContent.address,
      //   formContent.phone,
      //   formContent.country,
      //   formContent.website,
    ],
    (error, result) => {
      if (error) {
        response.status(500).send('Error Creating new User');
        console.log(request.body);
      } else {
        response.status(200).send('User created');
        console.log(request.body);
        console.log(result);
      }
    }
  );
});

module.exports = router;
