import { readFileSync } from 'fs'
// const { calculateSum } = require('./utils');

const input = readFileSync(`${__dirname}/input.txt`, {
  encoding: 'utf8',
  flag: 'r'
})

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

function checkAdjacentCells(
  strNum: string,
  matrix: any,
  currX: number,
  currY: number
) {
  const maxX = matrix[0].length - 1
  const maxY = matrix.length - 1

  const startX = currX - strNum.length + 1
  const endX = currX

  let start = startX - 1 >= 0 ? startX - 1 : 0
  let end = endX + 1 <= maxX ? endX + 1 : maxX

  // check top
  if (currY - 1 >= 0) {
    for (let i = start; i <= end; i++) {
      if (isSym(matrix[currY - 1][i])) {
        return true
      }
    }
  }

  // check sides
  if (startX - 1 >= 0 && isSym(matrix[currY][startX - 1])) {
    return true
  }
  if (endX + 1 <= maxX && isSym(matrix[currY][endX + 1])) {
    return true
  }

  // check bottom if possible
  if (currY + 1 <= maxY) {
    for (let i = start; i <= end; i++) {
      if (isSym(matrix[currY + 1][i])) {
        return true
      }
    }
  }
  return false
}

function solveEngine(str: string): number {
  let sum = 0
  let matrix = str.split('\n')

  for (let j = 0; j < matrix.length; j++) {
    const line = matrix[j]

    let strNum = ''
    for (let i = 0; i < line.length; i++) {
      let char = line[i]
      if (char === '.') {
        if (strNum.length && checkAdjacentCells(strNum, matrix, i - 1, j)) {
          sum += parseInt(strNum)
        }
        strNum = ''
        continue
      }
      if (isNumeric(char)) {
        strNum += char
      } else {
        if (strNum.length && checkAdjacentCells(strNum, matrix, i - 1, j)) {
          sum += parseInt(strNum)
        }
        strNum = ''
      }
    }
    if (
      strNum.length &&
      checkAdjacentCells(strNum, matrix, line.length - 1, j)
    ) {
      sum += parseInt(strNum)
    }
      strNum = ''

  }

  console.log("SUM", sum)
  return sum
}

function isNumeric(char: string): boolean {
  return !isNaN(parseInt(char))
}

function isSym(char: string): boolean {
  if (isNumeric(char)) return false
  if (char === '.') return false
  return true
}



function calculateEnginePower(str:string):number{
    let sum = 0
  let matrix = str.split('\n')

  for (let j = 0; j < matrix.length; j++) {
    const line = matrix[j]

    for (let i = 0; i < line.length; i++) {
      let char = line[i]
      if (char === '*') {
        sum += calculateAdjacentNumbers(j, i, matrix)
      }
    }
  }

  console.log("POWER SUM", sum)
  return sum
}

function calculateAdjacentNumbers (currY:number, currX:number, matrix:string[]){
        const maxX = matrix[0].length - 1
        const maxY = matrix.length - 1
      
        const startX = currX
        const endX = currX
      //   console.log('Checking', strNum, currX, currY, matrix)
      //   console.log('Limits', startX, endX, maxX, maxY)
      
        let start = startX - 1 >= 0 ? startX - 1 : 0
        let end = endX + 1 <= maxX ? endX + 1 : maxX


        let numbers:number[] = []
        // check top if possible
        if (currY - 1 >= 0) {
          for (let i = start; i <= end; i++) {
            if (isNumeric(matrix[currY - 1][i])) {
                let found = findNum(matrix, currY-1, i)
                if(numbers.indexOf(found) < 0){
                    numbers.push(found)
                }
                
            //   return true
            }
          }
        }
      
        // check sides
        if (startX - 1 >= 0 && isNumeric(matrix[currY][startX - 1])) {
          let found = findNum(matrix, currY, endX-1)
          if(numbers.indexOf(found) < 0){
            numbers.push(found)
          }
        //   return true
        }
      
        if (endX + 1 <= maxX && isNumeric(matrix[currY][endX + 1])) {
          let found = findNum(matrix, currY, endX+1)
          if(numbers.indexOf(found) < 0){
            numbers.push(found)
          }
        //   return true
        }
      
        // check bottom if possible
        if (currY + 1 <= maxY) {
          for (let i = start; i <= end; i++) {
            if (isNumeric(matrix[currY + 1][i])) {
              let found = findNum(matrix, currY + 1, i)
              if(numbers.indexOf(found) < 0){
                numbers.push(found)
              }
            //   return true
            }
          }
        }

        if(numbers.length == 2) return numbers[0] * numbers[1]
        return 0
}

function findNum(matrix:string[], y:number, x:number){
    // before??
    const maxX = matrix[0].length - 1
    let strNum = matrix[y][x]

    for(let i = x - 1 ; i >=0; i--){
        if(!isNumeric(matrix[y][i])) break
        strNum = matrix[y][i] + strNum
    }

    for(let i = x + 1 ; i <= maxX; i++){
        if(!isNumeric(matrix[y][i])) break
        strNum += matrix[y][i] 
    }

    return parseInt(strNum)
}

// EX: 1
solveEngine(example)
solveEngine(input)

// EX: 2
calculateEnginePower(example)
calculateEnginePower(input)