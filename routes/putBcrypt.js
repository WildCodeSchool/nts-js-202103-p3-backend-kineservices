const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/mysql');

router.put('/', (request, response) => {
  const { password, updateUser } = request.body;
  const { id } = updateUser;
  if (updateUser.birthdate) {
    const bParts = updateUser.birthdate.split('/');
    updateUser.birthdate = new Date(
      parseInt(bParts[2], 10),
      parseInt(bParts[1], 10) - 1,
      parseInt(bParts[0], 10)
    );
  }
  bcrypt.hash(password, 10, (errorCrypt, hash) => {
    if (errorCrypt) {
      response.status(500).send(errorCrypt);
    } else {
      updateUser.password = hash;
    }
    pool.query(
      'UPDATE user SET ? WHERE id = ?',
      [updateUser, id],
      (error, results) => {
        if (error) {
          console.log(error);
          response.status(500).send(error);
        } else if (results.affectedRows > 0) {
          response.status(200).send(results);
        } else {
          response.sendStatus(404);
        }
      }
    );
  });
});

module.exports = router;
