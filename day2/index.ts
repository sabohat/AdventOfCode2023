import { readFileSync } from 'fs';
import { calculatePower, checkValidity } from './utils';
// const { calculateSum } = require('./utils');

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});
console.log(checkValidity(input))
console.log(calculatePower(input))