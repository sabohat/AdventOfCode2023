import { readFileSync } from 'fs'
// const { calculateSum } = require('./utils');

const input = readFileSync(`${__dirname}/input.txt`, {
  encoding: 'utf8',
  flag: 'r'
})

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const points:any = {}

function getPoints(input: string): number {
  let sum = 0
  for (let line of input.split('\n')) {
    let arr = line.split(':')[1].split('|')
    sum += calculatePoints(arr[0].trim().replace(/  +/g, ' ').split(" "), arr[1].trim().replace(/  +/g, ' ').split(" "))
  }
  console.log(sum)
  return sum
}

function getCards(input: string): number {
    const arr1 = input.split('\n')
    let sum = arr1.length
    for (let i = 0; i <  arr1.length; i++) {
        const line = arr1[i]
      let arr = line.split(':')[1].split('|')
      calculateCards(i+1, arr[0].trim().replace(/  +/g, ' ').split(" "), arr[1].trim().replace(/  +/g, ' ').split(" "))
    }
    const list:number[] = Array.from(Array(arr1.length).keys())
    // console.log(sum, points, list)
let i = 0
    while ( i < list.length){
        // console.log("I", list[i])
        const point = points[list[i]+1]
        // console.log("point", point)
        if(point > 0){
            for(let j = 0; j < point; j++){
                list.push(list[i]+j+1)
            }
        }
        // console.log(list)

        sum++
        i++
    }

    console.log(list.length)
    return sum
  }

  function calculateCards(idx: number, arr1: string[], arr2: string[]): number {
    let count = 0
    for (let num of arr2){
        if (arr1.includes(num)){
            count++
        }
    }
  
    points[idx] = count
    return count 
  }

function calculatePoints(arr1: string[], arr2: string[]): number {
  let count = 0
  for (let num of arr2){
      if (arr1.includes(num)){
          count = count >= 1 ? count * 2 : 1
      }
  }
  return count 
}



getPoints(example)
getPoints(input)

getCards(example)
getCards(input)