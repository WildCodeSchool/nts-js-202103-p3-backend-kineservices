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
      console.log(error)
    } else {
      pool.query(
        'INSERT INTO user (firstname, lastname, birthdate, email, password, RPPS, siret, address, phone, country, website, role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          formContent.firstname,
          formContent.lastname,
          // formContent.picture,
          formContent.birthdate,
          formContent.email,
          hash,
          formContent.RPPS,
          formContent.siret,
          formContent.address,
          formContent.phone,
          formContent.country,
          formContent.website,
          formContent.role_id,
        ],
        (err, results) => {
          if (err) {
            response.status(500).send(err);
            console.log(err)
          } else {
            response.status(201).send({ id: results.insertId });
          }
        }
      );
    }
  });
});
module.exports = router;
