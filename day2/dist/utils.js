"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePower = exports.checkValidity = void 0;
var limit = {
    red: 12,
    green: 13,
    blue: 14
};
function checkValidity(input) {
    var sum = 0;
    // line
    outer: for (var _i = 0, _a = input.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        // remove Game x: part
        var steps = line.split(':').splice(1)[0];
        var gameNum = getNumber(line.split(':')[0]); // ['Game 1:', 'dadsa']
        // console.log('line', gameNum,  steps)
        for (var _b = 0, _c = steps.split(';'); _b < _c.length; _b++) {
            var step = _c[_b];
            // console.log("step", step)
            for (var _d = 0, _e = step.split(','); _d < _e.length; _d++) {
                var card = _e[_d];
                // console.log("card", card)
                var count = getNumber(card);
                var color = getColor(card);
                var colorLimit = limit[color];
                // console.log("Actual: ", count, color, "\nLimit", limit[color])
                if (count > colorLimit) {
                    // console.log("BREaking out")
                    continue outer;
                }
                // check limit
            }
        }
        // skipped
        sum = sum + gameNum;
    }
    console.log('sum', sum);
}
exports.checkValidity = checkValidity;
function getNumber(str) {
    ' 4 red';
    return parseInt(str.split(' ')[1]);
}
function getColor(str) {
    ' 4 red';
    return str.split(' ')[2];
}
function getPower(obj) {
    var power = 1;
    for (var _i = 0, _a = Object.values(obj); _i < _a.length; _i++) {
        var val = _a[_i];
        power *= val;
    }
    return power;
}
function calculatePower(input) {
    var sum = 0;
    outer: for (var _i = 0, _a = input.split('\n'); _i < _a.length; _i++) {
        var line = _a[_i];
        // remove Game x: part
        var steps = line.split(':').splice(1)[0];
        // console.log('line', gameNum,  steps)
        var max = {
            red: 0,
            green: 0,
            blue: 0
        };
        for (var _b = 0, _c = steps.split(';'); _b < _c.length; _b++) {
            var step = _c[_b];
            // console.log("step", step)
            for (var _d = 0, _e = step.split(','); _d < _e.length; _d++) {
                var card = _e[_d];
                // console.log("card", card)
                var count = getNumber(card);
                var color = getColor(card);
                if (count > max[color]) {
                    max[color] = count;
                }
                // console.log("Actual: ", count, color, "\nLimit", limit[color])
            }
        }
        // console.log("GAME: ", gameNum, line, "\nMAX: ", max)
        getPower(max);
        // skipped
        sum = sum + getPower(max);
    }
    // console.log("sum", sum)
    return sum;
}
exports.calculatePower = calculatePower;
