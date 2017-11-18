/* eslint-disable indent, no-unused-vars */
const { Router } = require('express');

const router = Router();

router.get((error, request, response, next) => {
  const dev = /^(dev(elopment)?|test(ing)?)$/gi.test(request.app.get('env'));
  response.locals.message = error.message;
  response.locals.error = dev ? error : {};
  response.status(error.status || 500);
  response.render('error');
});

router.get((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
