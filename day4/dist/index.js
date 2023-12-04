"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
// const { calculateSum } = require('./utils');
var input = (0, fs_1.readFileSync)("".concat(__dirname, "/input.txt"), {
    encoding: 'utf8',
    flag: 'r'
});
var example = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";
var points = {};
function getPoints(input) {
    var sum = 0;
    for (var _i = 0, _a = input.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        var arr = line.split(':')[1].split('|');
        sum += calculatePoints(arr[0].trim().replace(/  +/g, ' ').split(" "), arr[1].trim().replace(/  +/g, ' ').split(" "));
    }
    console.log(sum);
    return sum;
}
function getCards(input) {
    var arr1 = input.split('\n');
    var sum = arr1.length;
    for (var i_1 = 0; i_1 < arr1.length; i_1++) {
        var line = arr1[i_1];
        var arr = line.split(':')[1].split('|');
        calculateCards(i_1 + 1, arr[0].trim().replace(/  +/g, ' ').split(" "), arr[1].trim().replace(/  +/g, ' ').split(" "));
    }
    var list = Array.from(Array(arr1.length).keys());
    // console.log(sum, points, list)
    var i = 0;
    while (i < list.length) {
        // console.log("I", list[i])
        var point = points[list[i] + 1];
        // console.log("point", point)
        if (point > 0) {
            for (var j = 0; j < point; j++) {
                list.push(list[i] + j + 1);
            }
        }
        // console.log(list)
        sum++;
        i++;
    }
    console.log(list.length);
    return sum;
}
function calculateCards(idx, arr1, arr2) {
    var count = 0;
    for (var _i = 0, arr2_1 = arr2; _i < arr2_1.length; _i++) {
        var num = arr2_1[_i];
        if (arr1.includes(num)) {
            count++;
        }
    }
    points[idx] = count;
    return count;
}
function calculatePoints(arr1, arr2) {
    var count = 0;
    for (var _i = 0, arr2_2 = arr2; _i < arr2_2.length; _i++) {
        var num = arr2_2[_i];
        if (arr1.includes(num)) {
            count = count >= 1 ? count * 2 : 1;
        }
    }
    return count;
}
getPoints(example);
getPoints(input);
getCards(example);
getCards(input);
