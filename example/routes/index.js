/* eslint-disable indent, no-unused-vars */
const { Router } = require('express');

const router = Router();

router.get('/', (request, response) => {
  response.send('server: up & running');
});

router.get('/:greetings', (request, response) => {
  response.json({ message: `${request.params.greetings}! welcome to your api!` });
});

router.get('/page', (request, response, next) => {
  response.render('index', { title: 'webpack-cfg example' });
});

module.exports = router;
