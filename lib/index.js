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
  tap,
} = require('ramda');
const canvas = constructN(
  2,
  require('canvas-prebuilt')
);
const crypto = require('crypto');

const length = 5;

const imageSize = 250;

const cellSize = divide(imageSize, length);

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
  (cellSize, size) => compose(
    multiply(cellSize),
    floor,
    divide(__, size)
  );

const lookupCol =
  (cellSize, size) => compose(
    multiply(cellSize),
    floor,
    modulo(__, size)
  );

const row = ([x, y, z]) =>
  [x, y, z, y, x];

const cell =
  (cellSize, size) => (value, i) => ({
    value,
    x: lookupCol(cellSize, size)(i),
    y: lookupRow(cellSize, size)(i),
  });

const grid = compose(
  addIndex(map)(cell(cellSize, length)),
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
  (imageSize, cellSize) => grid => {
    const cvs = canvas(imageSize, imageSize);
    const ctx = getContext(cvs);

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

module.exports = compose(
  draw(imageSize, cellSize),
  grid,
  hash
);
