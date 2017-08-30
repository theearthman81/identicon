'use strict';

const {
  __,
  addIndex,
  compose,
  constructN,
  divide,
  filter,
  flatten,
  forEach,
  invoker,
  join,
  lens,
  map,
  modulo,
  multiply,
  not,
  prop,
  set,
  splitEvery,
  take,
} = require('ramda');
const canvas = constructN(
  2,
  require('canvas-prebuilt')
);
const crypto = require('crypto');

const isEven = compose(
  not,
  modulo(__, 2)
);

const floor = Math.floor;

const mutLens = key => lens(
  x => x.key,
  (val, x) => {
    x[key] = val;
    return x;
  }
);

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
const lookupRow =
  cellSize => compose(
    multiply(cellSize),
    floor,
    divide(__, 5)
  );

const lookupCol =
  cellSize => compose(
    multiply(cellSize),
    floor,
    modulo(__, 5)
  );

const row = ([x, y, z]) =>
  [x, y, z, y, x];

const cell =
  cellSize => (value, i) => ({
    value,
    x: lookupCol(cellSize)(i),
    y: lookupRow(cellSize)(i),
  });

const grid =
  imageSize => compose(
    addIndex(map)(
      cell(divide(imageSize, 5))
    ),
    flatten,
    map(row),
    splitEvery(3),
    take(15)
  );

// Draw identicon
const isEvenValue = compose(
  isEven,
  prop('value')
);

const color = compose(
  c => `rgb(${c})`,
  join(','),
  map(prop('value')),
  take(3)
);

const getContext = invoker(1, 'getContext')('2d');

const fillStyleLens = mutLens('fillStyle');

const toBuffer = invoker(0, 'toBuffer');

const draw =
  imageSize => grid => {
    const cvs = canvas(imageSize, imageSize);
    const ctx = getContext(cvs);
    const cellSize = divide(imageSize, 5);

    compose(
      set(fillStyleLens, __, ctx),
      color
    )(grid);

    compose(
      forEach(({ x, y }) => {
        ctx.fillRect(x, y, cellSize, cellSize, ctx);
      }),
      filter(isEvenValue)
    )(grid);

    return toBuffer(cvs);
  };

module.exports = {
  draw,
  grid,
  hash,
};
