const express = require('express');
const log = require('npmlog');
const identicon = require('./lib');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  const data = identicon(req.query.q);
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': data.length,
  });
  res.end(data);
});

app.listen(PORT, () => {
  log.info(`running on ${PORT}...`);
});
