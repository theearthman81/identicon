'use strict';

const {
  compose,
  divide,
} = require('ramda');
const {
  draw,
  grid,
  hash,
} = require('./identicon');

const length = 5;

const imageSize = 250;

const cellSize = divide(imageSize, length);

module.exports = compose(
  draw(imageSize, cellSize),
  grid(cellSize, length),
  hash
);
