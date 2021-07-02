const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { formContent } = request.body;
  console.log(formContent);
  bcrypt.hash(formContent.password, 10, (error, hash) => {
    if (error) {
      response.status(500).send(error);
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
        (err, results) => {
          if (err) {
            console.log(err);
            response.status(500).send(err);
          } else {
            response.status(201).send({ id: results.insertId });
          }
        }
      );
    }
  });
});
module.exports = router;
