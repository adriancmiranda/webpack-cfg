/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveFavicon = require('serve-favicon');
const debug = require('debug');
const morgan = require('morgan');
const routes = require('./routes');

const info = debug('info:app');
const viewsDir = path.join(__dirname, 'public');
const publicDir = path.join(__dirname, 'public');
const staticDir = path.join(__dirname, 'static');
const favicon = path.join(staticDir, 'favicon.ico');
const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', viewsDir);
app.use(serveFavicon(favicon));
app.use([express.static(publicDir), express.static(staticDir)]);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', routes);

info('app: up & running');
module.exports = app;
