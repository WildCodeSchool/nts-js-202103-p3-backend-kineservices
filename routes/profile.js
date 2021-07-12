const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/:id', (request, response) => {
  const { id } = request.params;

  pool.query('SELECT * FROM user WHERE id = ? ', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.put('/:id', (request, response) => {
  const userToUpdate = request.body;
  const { id } = request.params;
  pool.query(
    'UPDATE user SET ? WHERE id = ?',
    [userToUpdate, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.status(200).send(results);
      } else {
        response.sendStatus(404);
      }
    }
  );
});

module.exports = router;
