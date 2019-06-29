/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { subscription } = require('../database/db');

const app = express();

const port = 3000;
app.listen(port, () => console.log(`The app is listening on port ${port}!`));

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/subscribe', (req, res) => {
  subscription.find()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/subscribe', (req, res) => {
  subscription.insertMany(req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
});
