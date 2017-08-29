'use strict';

const { expect } = require('chai');
const {
  grid,
  hash,
} = require('./lib/identicon');

describe('Indenticon', () => {
  it('can md5 hash a string', () => {
    expect(hash('foo').join('')).to.equal('17218924219761942489223723910179204196164216');
    expect(hash('bar').join('')).to.equal('5518129257411719228918624682794581242');
    expect(hash('').join('')).to.equal('2122914021714301784233128915223624866126');
  });

  it('can create a grid', () => {
    expect(
      grid(50, 5)('17218924219761942489223723910179204196164216')
    ).to.deep.equal(
      [
        {
          "value": "1",
          "x": 0,
          "y": 0
        },
        {
          "value": "7",
          "x": 50,
          "y": 0
        },
        {
          "value": "2",
          "x": 100,
          "y": 0
        },
        {
          "value": "7",
          "x": 150,
          "y": 0
        },
        {
          "value": "1",
          "x": 200,
          "y": 0
        },
        {
          "value": "1",
          "x": 0,
          "y": 50
        },
        {
          "value": "8",
          "x": 50,
          "y": 50
        },
        {
          "value": "9",
          "x": 100,
          "y": 50
        },
        {
          "value": "8",
          "x": 150,
          "y": 50
        },
        {
          "value": "1",
          "x": 200,
          "y": 50
        },
        {
          "value": "2",
          "x": 0,
          "y": 100
        },
        {
          "value": "4",
          "x": 50,
          "y": 100
        },
        {
          "value": "2",
          "x": 100,
          "y": 100
        },
        {
          "value": "4",
          "x": 150,
          "y": 100
        },
        {
          "value": "2",
          "x": 200,
          "y": 100
        },
        {
          "value": "1",
          "x": 0,
          "y": 150
        },
        {
          "value": "9",
          "x": 50,
          "y": 150
        },
        {
          "value": "7",
          "x": 100,
          "y": 150
        },
        {
          "value": "9",
          "x": 150,
          "y": 150
        },
        {
          "value": "1",
          "x": 200,
          "y": 150
        },
        {
          "value": "6",
          "x": 0,
          "y": 200
        },
        {
          "value": "1",
          "x": 50,
          "y": 200
        },
        {
          "value": "9",
          "x": 100,
          "y": 200
        },
        {
          "value": "1",
          "x": 150,
          "y": 200
        },
        {
          "value": "6",
          "x": 200,
          "y": 200
        }
      ]
    );
  });
});

require('mocha-eslint')([
  'lib/*.js',
  '*.js',
]);
