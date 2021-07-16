/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();

const pool = require('../config/mysql');

router.get('/', function (request, response) {
  pool.query(
    'SELECT formation.*, category.name FROM formation JOIN category ON formation.category_id WHERE formation.category_id=category.id;',
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(results);
      }
    }
  );
});

router.get('/', function (request, response) {
  pool.query('SELECT * FROM formation', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('SELECT * FROM formation WHERE id=?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else if (results.length > 0) {
      response.send(results[0]);
    } else {
      response.status(404).send('pas de formation pour cet id');
    }
  });
});

router.post('/', (request, response) => {
  const formation = request.body;

  pool.query(
    `INSERT INTO formation (title, category_id, user_id, date, price, website, description) VALUES (?,?,?,?,?,?,?)`,
    [
      formation.title,
      formation.category_id,
      formation.user_id,
      formation.date,
      formation.price,
      formation.website,
      formation.description,
    ],
    (error, results) => {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send({
          id: results.insertId,
          ...formation,
        });
      }
    }
  );
});

router.put('/:id', (request, response) => {
  const userPropsToUpdate = request.body;
  const { id } = request.params;
  pool.query(
    'UPDATE formation SET ? WHERE id = ?',
    [userPropsToUpdate, id],
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

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  pool.query('DELETE FROM formation WHERE id= ?', [id], (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else if (results.affectedRows > 0) {
      response.status(200).send(results);
    } else {
      response.status(404).send({ message: 'formation not found' });
    }
  });
});

module.exports = router;
