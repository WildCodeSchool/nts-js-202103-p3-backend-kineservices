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

module.exports = router;
