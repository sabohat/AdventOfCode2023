"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var utils_1 = require("./utils");
// const { calculateSum } = require('./utils');
var input = (0, fs_1.readFileSync)("".concat(__dirname, "/input.txt"), {
    encoding: 'utf8',
    flag: 'r',
});
console.log((0, utils_1.calculateSum)(input.split('\n'), true)); // first
console.log((0, utils_1.calculateSum)(input.split('\n'), false)); // second
