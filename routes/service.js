/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const pool = require('../config/mysql');

// get all services
router.get('/', function (request, response) {
  pool.query('SELECT * FROM service', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
    console.log(error, results);
  });
});

// get with id
router.get('/:id', function (request, response) {
  const { id } = request.params;
  pool.query('SELECT * FROM service WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else if (results.length > 0) {
      response.send(results[0]);
    } else {
      response.sendStatus(404);
    }
  });
});

// create
router.post('/', (request, response) => {
  const service = request.body;
  pool.query(
    'INSERT INTO service (title, website, description, user_id, price) VALUES (?, ?, ?, ?, ?)',
    [
      service.title,
      service.website,
      service.description,
      service.user_id,
      service.price,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...service,
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
    'UPDATE service SET ? WHERE id = ?',
    [result, id],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
        console.log(error);
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
  pool.query('DELETE FROM service WHERE id = ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else if (results.affectedRows > 0) {
      response.sendStatus(204);
    } else {
      response.status(404).send({ error: `no service with id ${id}` });
    }
  });
});

module.exports = router;
