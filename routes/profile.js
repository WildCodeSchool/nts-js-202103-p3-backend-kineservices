const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

router.post('/:id', function (request, response) {
  const { id } = request.params;

  console.log(id);
  pool.query('SELECT * FROM user WHERE id = ? ', [id], (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;
