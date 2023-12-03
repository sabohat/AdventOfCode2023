"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
// const { calculateSum } = require('./utils');
var input = (0, fs_1.readFileSync)("".concat(__dirname, "/input.txt"), {
    encoding: 'utf8',
    flag: 'r'
});
var example = "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..";
function checkAdjacentCells(strNum, matrix, currX, currY) {
    var maxX = matrix[0].length - 1;
    var maxY = matrix.length - 1;
    var startX = currX - strNum.length + 1;
    var endX = currX;
    var start = startX - 1 >= 0 ? startX - 1 : 0;
    var end = endX + 1 <= maxX ? endX + 1 : maxX;
    // check top
    if (currY - 1 >= 0) {
        for (var i = start; i <= end; i++) {
            if (isSym(matrix[currY - 1][i])) {
                return true;
            }
        }
    }
    // check sides
    if (startX - 1 >= 0 && isSym(matrix[currY][startX - 1])) {
        return true;
    }
    if (endX + 1 <= maxX && isSym(matrix[currY][endX + 1])) {
        return true;
    }
    // check bottom if possible
    if (currY + 1 <= maxY) {
        for (var i = start; i <= end; i++) {
            if (isSym(matrix[currY + 1][i])) {
                return true;
            }
        }
    }
    return false;
}
function solveEngine(str) {
    var sum = 0;
    var matrix = str.split('\n');
    for (var j = 0; j < matrix.length; j++) {
        var line = matrix[j];
        var strNum = '';
        for (var i = 0; i < line.length; i++) {
            var char = line[i];
            if (char === '.') {
                if (strNum.length && checkAdjacentCells(strNum, matrix, i - 1, j)) {
                    sum += parseInt(strNum);
                }
                strNum = '';
                continue;
            }
            if (isNumeric(char)) {
                strNum += char;
            }
            else {
                if (strNum.length && checkAdjacentCells(strNum, matrix, i - 1, j)) {
                    sum += parseInt(strNum);
                }
                strNum = '';
            }
        }
        if (strNum.length &&
            checkAdjacentCells(strNum, matrix, line.length - 1, j)) {
            sum += parseInt(strNum);
        }
        strNum = '';
    }
    console.log("SUM", sum);
    return sum;
}
function isNumeric(char) {
    return !isNaN(parseInt(char));
}
function isSym(char) {
    if (isNumeric(char))
        return false;
    if (char === '.')
        return false;
    return true;
}
function calculateEnginePower(str) {
    var sum = 0;
    var matrix = str.split('\n');
    for (var j = 0; j < matrix.length; j++) {
        var line = matrix[j];
        for (var i = 0; i < line.length; i++) {
            var char = line[i];
            if (char === '*') {
                sum += calculateAdjacentNumbers(j, i, matrix);
            }
        }
    }
    console.log("POWER SUM", sum);
    return sum;
}
function calculateAdjacentNumbers(currY, currX, matrix) {
    var maxX = matrix[0].length - 1;
    var maxY = matrix.length - 1;
    var startX = currX;
    var endX = currX;
    //   console.log('Checking', strNum, currX, currY, matrix)
    //   console.log('Limits', startX, endX, maxX, maxY)
    var start = startX - 1 >= 0 ? startX - 1 : 0;
    var end = endX + 1 <= maxX ? endX + 1 : maxX;
    var numbers = [];
    // check top if possible
    if (currY - 1 >= 0) {
        for (var i = start; i <= end; i++) {
            if (isNumeric(matrix[currY - 1][i])) {
                var found = findNum(matrix, currY - 1, i);
                if (numbers.indexOf(found) < 0) {
                    numbers.push(found);
                }
                //   return true
            }
        }
    }
    // check sides
    if (startX - 1 >= 0 && isNumeric(matrix[currY][startX - 1])) {
        var found = findNum(matrix, currY, endX - 1);
        if (numbers.indexOf(found) < 0) {
            numbers.push(found);
        }
        //   return true
    }
    if (endX + 1 <= maxX && isNumeric(matrix[currY][endX + 1])) {
        var found = findNum(matrix, currY, endX + 1);
        if (numbers.indexOf(found) < 0) {
            numbers.push(found);
        }
        //   return true
    }
    // check bottom if possible
    if (currY + 1 <= maxY) {
        for (var i = start; i <= end; i++) {
            if (isNumeric(matrix[currY + 1][i])) {
                var found = findNum(matrix, currY + 1, i);
                if (numbers.indexOf(found) < 0) {
                    numbers.push(found);
                }
                //   return true
            }
        }
    }
    if (numbers.length == 2)
        return numbers[0] * numbers[1];
    return 0;
}
function findNum(matrix, y, x) {
    // before??
    var maxX = matrix[0].length - 1;
    var strNum = matrix[y][x];
    for (var i = x - 1; i >= 0; i--) {
        if (!isNumeric(matrix[y][i]))
            break;
        strNum = matrix[y][i] + strNum;
    }
    for (var i = x + 1; i <= maxX; i++) {
        if (!isNumeric(matrix[y][i]))
            break;
        strNum += matrix[y][i];
    }
    return parseInt(strNum);
}
// EX: 1
solveEngine(example);
solveEngine(input);
// EX: 2
calculateEnginePower(example);
calculateEnginePower(input);
