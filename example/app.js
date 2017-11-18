/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveFavicon = require('serve-favicon');
const debug = require('debug');
const morgan = require('morgan');
const routes = require('./routes');
const errors = require('./routes/errors');

const info = debug('info:app');
const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');
const staticDir = path.join(__dirname, 'static');
const favicon = path.join(staticDir, 'favicon.ico');
const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', viewsDir);
app.use('/public', express.static(publicDir));
app.use('/static', express.static(staticDir));
app.use(serveFavicon(favicon));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(errors);

info('app: up & running');
module.exports = app;
