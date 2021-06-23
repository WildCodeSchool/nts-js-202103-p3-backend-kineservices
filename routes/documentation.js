/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

// trouver all doc
router.get('/', function (request, response) {
  pool.query('SELECT * FROM documentation', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

// trouver avec id
router.get('/:id', function (request, response) {
  const { id } = request.params;
  pool.query(
    'SELECT * FROM documentation WHERE id = ?',
    [id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.length > 0) {
        response.send(results[0]);
      } else {
        response.sendStatus(404);
      }
    }
  );
});

// create
router.post('/', (request, response) => {
  const documentation = request.body;
  pool.query(
    `INSERT INTO documentation(title, category_id, user_id, description, price) VALUES (?, ?, ?, ?, ?)`,
    [
      documentation.title,
      documentation.category_id,
      documentation.user_id,
      documentation.description,
      documentation.price,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...documentation,
        });
      }
    }
  );
});

// update
router.put('/:id', (request, response) => {
  const result = request.body;
  const { id } = request.params;
  pool.query(
    'UPDATE documentation SET ? WHERE id = ?',
    [result, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.status(200).send(result);
      } else {
        response.sendStatus(404);
      }
    }
  );
});

// delete
router.delete('/:id', (request, response) => {
  const { id } = request.params;
  pool.query(
    'DELETE FROM documentation WHERE id = ?',
    [id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.sendStatus(204);
      } else {
        response.status(404).send({ error: `no documentation with id ${id}` });
      }
    }
  );
});

module.exports = router;
