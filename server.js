'use strict';

const express = require('express');
const log = require('npmlog');
const identicon = require('./lib');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const {
    query: {
      q,
    },
  } = req;

  if (typeof q !== 'string') {
    return res.status(500).send(`Please supply a 'q' query parameter.`);
  }

  const data = identicon(q);

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': data.length,
  });

  res.end(data);
});

app.listen(PORT, () => {
  log.info(`running on ${PORT}...`);
});
