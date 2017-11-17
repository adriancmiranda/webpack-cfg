const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require('debug');
const morgan = require('morgan');

const info = debug('eguru:app');
const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

info('app: up & running');
module.exports = app;
