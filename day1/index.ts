import { readFileSync } from 'fs';
import { calculateSum } from './utils';
// const { calculateSum } = require('./utils');

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});

console.log(calculateSum(input.split('\n'), true)) // first
console.log(calculateSum(input.split('\n'), false)) // second
