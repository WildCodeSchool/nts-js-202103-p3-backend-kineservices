const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const pool = require('../config/mysql');

router.post('/', (request, response) => {
  const { user } = request.body;
  console.log(user.password);
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      response.status(500).send(error);
      console.log(error);
    } else {
      pool.query(
        'INSERT INTO user (firstname, lastname, birthdate, email, password, RPPS, SIRET, address, phone, country, website, role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          user.firstname,
          user.lastname,
          // formContent.picture,
          user.birthdate,
          user.email,
          hash,
          user.RPPS,
          user.SIRET,
          user.address,
          user.phone,
          user.country,
          user.website,
          user.role_id,
        ],
        (err, results) => {
          if (err) {
            response.status(500).send(err);
            console.log(err);
          } else {
            response.status(201).send({ id: results.insertId });
            console.log(results);
          }
        }
      );
    }
  });
});
module.exports = router;
