const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

const numbersStr = [
    'one1one',
    'two2two',
    'three3three',
    'four4four',
    'five5five',
    'six6six',
    'seven7seven',
    'eight8eight',
    'nine9nine'
  ]

function isNumeric(str: string): boolean {
  if (typeof str != 'string') return false // we only process strings!
  return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  // !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
}

function findStrNum(str: string, first: boolean): number {
  let min = str.length - 1
  let max = 0

  let res = 0
  numbers.forEach((num, idx) => {
    if (first) {
      if (str.indexOf(num) >= 0 && str.indexOf(num) < min) {
        res = idx + 1
        min = str.indexOf(num)
      }
    } else {
      if (str.lastIndexOf(num) >= 0 && str.lastIndexOf(num) >= max) {
        res = idx + 1
        max = str.lastIndexOf(num)
      }
    }
  })
  return res
}

const getFirstNumber = (str: string, isFirstQuestion:boolean): number => {
  let res = ''
  let num: number = 0
  for (let char of str) {
    if (isNumeric(char)) {
      num = parseInt(char)
      break
    }
    res += char
  }

  if(isFirstQuestion) return num

  let ans = findStrNum(res, true)
  return  ans ? ans : num
}

const getLastNumber = (str: string, isFirstQuestion:boolean): number => {
  let res = ''
  let num = 0
  for (let i = str.length - 1; i >= 0; i--) {
    if (isNumeric(str[i])) {
      num = parseInt(str[i])
      break
    }
    res = str[i] + res
  }

  if(isFirstQuestion) return num

  let ans = findStrNum(res, false)

  return ans ? ans : num
}

// 2nd approach: works slow
const replace = (str:string)=>{
    let res = str
    numbers.forEach((num, idx)=>
      res = res.replaceAll(num, numbersStr[idx]))
    return res
}

export const calculateSum = (arr: string[], isFirstQuestion: boolean) => {
  let sum = 0
  for (let line of arr) {
    
    // let input = isFirstQuestion? line : replace(line)

    sum += getFirstNumber(line, isFirstQuestion) * 10 + getLastNumber(line, isFirstQuestion)
  }
  return sum
}
