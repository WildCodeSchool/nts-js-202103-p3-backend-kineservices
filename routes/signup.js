const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'tmp/' });
const pool = require('../config/mysql');

router.post('/', upload.single('picture'), (request, response) => {
  const { formContent } = request.body;
  fs.rename(
    request.file.path,
    `public/images/${request.file.originalname}`,
    (errorPicture) => {
      if (errorPicture) {
        response.status(500).send("le fichier n'a pas pu etre télechargé");
      } else {
        response.send('le fichier a été telechargé avec succes');
      }
    }
  );

  bcrypt.hash(formContent.password, 10, (error, hash) => {
    if (error) {
      response.status(500).send(error);
    } else {
      pool.query(
        'INSERT INTO user (firstname, lastname, birthdate, email, password, RPPS, siret, address, phone, country, website, role_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [
          formContent.firstname,
          formContent.lastname,
          formContent.picture,
          formContent.birthdate,
          formContent.email,
          hash,
          formContent.RPPS,
          formContent.siret,
          formContent.address,
          formContent.phone,
          formContent.country,
          formContent.website,
          formContent.role_id,
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
});
module.exports = router;
