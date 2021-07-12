/* eslint-disable camelcase */
/* eslint-disable func-names */
const express = require('express');

const router = express.Router();
const multer = require('multer');

const uploadFile = multer({
  limits: { fileSize: Infinity },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/vnd.ms-powerpoint' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
      file.mimetype === 'application/vnd.oasis.opendocument.text' ||
      file.mimetype === 'application/vnd.amazon.ebook' ||
      file.mimetype === 'application/epub+zip'
    ) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('erreur'));
    }
  },
  dest: 'tmp/',
});
const fs = require('fs');
const pool = require('../config/mysql');

router.get('/', function (request, response) {
  pool.query('SELECT * FROM documentation', (error, results) => {
    if (error) {
      response.status(500).send(error);
    } else {
      response.send(results);
    }
  });
});

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

router.post('/', uploadFile.single('file'), (request, response) => {
  const documentation = request.body;
  console.log(documentation);
  const folder = `public/images/${documentation.user_id}/`;
  fs.mkdirSync(folder, { recursive: true });
  const fileName = `${folder}/${Date.now()}-${request.file.originalname}`;
  fs.rename(request.file.path, fileName, function (err) {
    if (err) {
      response.status(500).send(err);
    } else {
      pool.query(
        `INSERT INTO documentation(title, category_id, user_id, description, price, file) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          documentation.title,
          documentation.category_id,
          documentation.user_id,
          documentation.description,
          documentation.price,
          fileName,
        ],
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
    }
  });
});

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
