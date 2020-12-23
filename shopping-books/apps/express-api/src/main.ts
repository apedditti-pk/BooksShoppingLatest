const express = require('express');
export const app = express();

import * as book from '../src/app/book.controller';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-api!' });
});

app.get('/search/:searchItem',book.getbooks);

app.get('/search/', book.getbooks);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
