/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const port = 3000;
app.listen(port, () => console.log(`The app is listening on port ${port}!`));

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
