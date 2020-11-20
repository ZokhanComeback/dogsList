const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  const options = {
    html: ''
  }
  axios.get(`https://dog.ceo/api/breeds/list/all`)
    .then(result => {
      const list = result.data.message;
      const keys = Object.getOwnPropertyNames(list);
      const html = keys.reduce((prev, curr, index) => {
        if (
          keys.indexOf(prev) === 0
        ) {
          return `<li><a href="dog/${prev}">${prev}</a></li>` + `<li><a href="dog/${curr}">${curr}</a></li>`;
        } else {
          return prev + `<li><a href="dog/${curr}">${curr}</a></li>`;
        }
      });
      options.html = `<ul>${html}</ul>`;
    })
    .catch(e => {

    })
    .finally(() => {
      res.render('dog', options);
    })
});

router.get('/:breed', (req, res, next) => {
  const options = {
    requestError: false,
    breedError: false,
    dog: ''
  }
  axios.get(`https://dog.ceo/api/breed/${req.params.breed}/images/random`)
    .then(result => {
      options.dog = result.data.message;
    })
    .catch(e => {
      options.breedError = true;
    })
    .finally(() => {
      res.render('breed', options);
    })
});

module.exports = router;
