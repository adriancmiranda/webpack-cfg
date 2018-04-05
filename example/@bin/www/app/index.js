const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require('debug')('eguru:app');
const morgan = require('morgan');

const app = express();

app.enable('trust proxy');
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

module.exports = app;
