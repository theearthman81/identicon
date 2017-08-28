const {
  __,
  addIndex,
  compose,
  divide,
  filter,
  flatten,
  join,
  map,
  modulo,
  not,
  prop,
  split,
  splitEvery,
  take,
  tap,
} = require('ramda');
const Canvas = require('canvas-prebuilt');
const crypto = require('crypto');

const length = 5;

const imageSize = 250;

const cellSize = divide(imageSize, length);

const idOdd = modulo(__, 2);

const isEven = x => not(idOdd(x));

const floor = Math.floor;

// Hash content
const md5 = data =>
  crypto
    .createHash('md5')
    .update(data)
    .digest('binary');

const toCharCode = char =>
  char.charCodeAt(0);

const hash = compose(
  map(toCharCode),
  md5
);

// Create grid
const row = ([x, y, z]) =>
  [x, y, z, y, x];

const cell =
  (cellSize, size) => (value, i) => ({
    value,
    x: floor(modulo(i, size)) * cellSize,
    y: floor(divide(i, size)) * cellSize,
});

const grid = compose(
  addIndex(map)(cell(cellSize, length)),
  flatten,
  map(row),
  splitEvery(3),
  take(15)
);

const color = compose(
  join(','),
  map(prop('value')),
  take(3)
);

// Draw identicon
const isEvenValue = compose(
  isEven,
  prop('value')
);

const draw = (imageSize, cellSize) => grid => {
  const canvas = new Canvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = `rgb(${color(grid)})`;

  grid
    .filter(isEvenValue)
    .forEach(({ x, y }) => {
      ctx.fillRect(x, y, cellSize, cellSize);
    });

  return canvas.toBuffer();
};

module.exports = compose(
  draw(imageSize, cellSize),
  grid,
  hash
);
