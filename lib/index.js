'use strict';

const {
  compose,
} = require('ramda');
const {
  draw,
  grid,
  hash,
} = require('./identicon');

const size = 250;

module.exports = compose(
  draw(size),
  grid(size),
  hash
);
