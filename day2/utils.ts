interface StringObj {
  [key: string]: number
}

const limit: StringObj = {
  red: 12,
  green: 13,
  blue: 14
}

export function checkValidity(input: string) {
  let sum = 0
  // line
  outer: for (let line of input.split('\n')) {
    // remove Game x: part
    let steps: string = line.split(':').splice(1)[0]
    let gameNum = getNumber(line.split(':')[0]) // ['Game 1:', 'dadsa']
    // console.log('line', gameNum,  steps)
    for (let step of steps.split(';')) {
      // console.log("step", step)
      for (let card of step.split(',')) {
        // console.log("card", card)
        let count = getNumber(card)
        let color = getColor(card)
        let colorLimit = limit[color]
        // console.log("Actual: ", count, color, "\nLimit", limit[color])
        if (count > colorLimit) {
          // console.log("BREaking out")
          continue outer
        }
        // check limit
      }
    }
    // skipped
    sum = sum + gameNum
  }
  return sum
}

function getNumber(str: string): number {
  ' 4 red'
  return parseInt(str.split(' ')[1])
}

function getColor(str: string): string {
  ' 4 red'
  return str.split(' ')[2]
}

function getPower(obj: StringObj): number {
  let power = 1
  for (let val of Object.values(obj)) {
    power *= val as number
  }
  return power
}

export function calculatePower(input: string): number {
  let sum = 0
  outer: for (let line of input.split('\n')) {
    // remove Game x: part
    let steps: string = line.split(':').splice(1)[0]
    // console.log('line', gameNum,  steps)
    let max: StringObj = {
      red: 0,
      green: 0,
      blue: 0
    }
    for (let step of steps.split(';')) {
      // console.log("step", step)
      for (let card of step.split(',')) {
        // console.log("card", card)
        let count = getNumber(card)
        let color = getColor(card)
        if (count > max[color]) {
          max[color] = count
        }
        // console.log("Actual: ", count, color, "\nLimit", limit[color])
      }
    }
    // console.log("GAME: ", gameNum, line, "\nMAX: ", max)
    getPower(max)

    // skipped
    sum = sum + getPower(max)
  }
  // console.log("sum", sum)
  return sum
}
