/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

// trouver all doc
router.get('/documentation', function (request, response) {
  pool.query('SELECT * FROM documentation', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

// trouver avec id
router.get('/documentation/:id', function (request, response) {
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
router.post('/documentation', (request, response) => {
  const documentation = request.body;
  pool.query(
    `INSERT INTO documentation(content) VALUES (?)`,
    [documentation.content],
    (error, results) => {
      if (error) {
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
router.put('/documentation/:id', (request, response) => {
  const { content } = request.body;
  const { id } = request.params;
  pool.query(
    'UPDATE documentation SET content = ? WHERE id = ?',
    [content, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else if (results.affectedRows > 0) {
        response.status(200).send({ id, content });
      } else {
        response.sendStatus(404);
      }
    }
  );
});

// delete
router.delete('/documentation/:id', (request, response) => {
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
