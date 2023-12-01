"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSum = void 0;
var numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];
var numbersStr = [
    'one1one',
    'two2two',
    'three3three',
    'four4four',
    'five5five',
    'six6six',
    'seven7seven',
    'eight8eight',
    'nine9nine'
];
function isNumeric(str) {
    if (typeof str != 'string')
        return false; // we only process strings!
    return !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
    // !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
}
function findStrNum(str, first) {
    var min = str.length - 1;
    var max = 0;
    var res = 0;
    numbers.forEach(function (num, idx) {
        if (first) {
            if (str.indexOf(num) >= 0 && str.indexOf(num) < min) {
                res = idx + 1;
                min = str.indexOf(num);
            }
        }
        else {
            if (str.lastIndexOf(num) >= 0 && str.lastIndexOf(num) >= max) {
                res = idx + 1;
                max = str.lastIndexOf(num);
            }
        }
    });
    return res;
}
var getFirstNumber = function (str, isFirstQuestion) {
    var res = '';
    var num = 0;
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        if (isNumeric(char)) {
            num = parseInt(char);
            break;
        }
        res += char;
    }
    if (isFirstQuestion)
        return num;
    var ans = findStrNum(res, true);
    return ans ? ans : num;
};
var getLastNumber = function (str, isFirstQuestion) {
    var res = '';
    var num = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if (isNumeric(str[i])) {
            num = parseInt(str[i]);
            break;
        }
        res = str[i] + res;
    }
    if (isFirstQuestion)
        return num;
    var ans = findStrNum(res, false);
    return ans ? ans : num;
};
var replace = function (str) {
    var res = str;
    numbers.forEach(function (num, idx) {
        return res = res.replaceAll(num, numbersStr[idx]);
    });
    return res;
};
var calculateSum = function (arr, isFirstQuestion) {
    var sum = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var line = arr_1[_i];
        var input = line;
        // let input = isFirstQuestion? line : replace(line)
        sum += getFirstNumber(input, isFirstQuestion) * 10 + getLastNumber(input, isFirstQuestion);
    }
    return sum;
};
exports.calculateSum = calculateSum;
