const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');

const upload = multer({
  limits: { fileSize: Infinity },
  fileFilter: (request, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
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

router.post('/', upload.single('picture'), (request, response) => {
  const formUser = request.body;
  const accessFile = `images/${formUser.firstname}-${formUser.lastname}-${formUser.birthdate}/`;
  const folder = `public/images/${formUser.firstname}-${formUser.lastname}-${formUser.birthdate}/`;
  fs.mkdirSync(folder, { recursive: true });
  const fileName = `${accessFile}${request.file.originalname}`;
  fs.rename(request.file.path, `public/${fileName}`, function (fileErr) {
    if (fileErr) {
      response.status(500).send(fileErr);
    } else {
      bcrypt.hash(formUser.password, 10, (error, hash) => {
        if (error) {
          response.status(500).send(error);
        } else {
          pool.query(
            'INSERT INTO user (firstname, lastname,picture, birthdate, email, password, RPPS, SIRET, address, phone, country, website, role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [
              formUser.firstname,
              formUser.lastname,
              fileName,
              formUser.birthdate,
              formUser.email,
              hash,
              formUser.RPPS,
              formUser.SIRET,
              formUser.address,
              formUser.phone,
              formUser.country,
              formUser.website,
              formUser.role_id,
            ],
            (err, results) => {
              if (err) {
                response.status(500).send(err);
              } else {
                response.status(201).send({ id: results.insertId });
              }
            }
          );
        }
      });
    }
  });
});
module.exports = router;
