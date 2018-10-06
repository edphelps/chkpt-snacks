/*
   View
*/

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

const snacksRouter = require('./snacks-router');

app.use(morgan('dev'));
app.use(bodyParser.json());

// ==================================
// /snacks routing
// ==================================
app.use('/snacks', snacksRouter);

// ==================================
// ROLL MY OWN 404
// ==================================
app.use((req, res, next) => {
  res.status(404).json({ error: { message: '404: Could not find what you were asking for' } })
});

// ===========================================================
// ROLL MY OWN 500
// ===========================================================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.log("=========== APP ERROR ==========");
  console.log(err);
  console.log("^^^^^^^^^^^ APP ERROR ^^^^^^^^^");
  res.status(status).json({ error: err });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Snacks API listening on port ${port}!`);
  });
}

module.exports = app
