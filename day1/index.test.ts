import { calculateSum } from './utils';

const mockDataPart1 = `1abc2
ninetwofive3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const mockDataPart2 = `mchm6`;

describe('Day1', () => {
    test('Part 1 => What is the sum of all of the calibration values?', () => {
        const splitInput = mockDataPart1.split('\n');

        const result = calculateSum(splitInput, true);

        expect(result).toBe(142);
    });

    test('Part 2 => What is the sum of all of the calibration values?', () => {
        const splitInput = mockDataPart2.split('\n');

        const result = calculateSum(splitInput, false);

        expect(result).toBe(66);
    });
});