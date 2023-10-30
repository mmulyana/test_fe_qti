// soal 1
function reverse(arr) {
  let res = []

  for (let index = 0; index < arr.length; index++) {
    if (index < arr.length - 1) {
      res.unshift(arr[index])
    } else {
      res.push(arr[index])
    }
  }

  return res.join('')
}

// soal 2
function findLongest(text) {
  const tmp = text.split(' ')
  let index = 0
  let currentLongest = ''
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].length > currentLongest) {
      index = i
      currentLongest = tmp[i].length
    }
  }

  return `${tmp[index]} : ${currentLongest} karakter`
}

// soal 3
function uniqueNumber(num) {
  let tmp = {}
  let arr = Array.from(String(num), Number)

  for (let i = 0; i < arr.length; i++) {
    if (tmp[arr[i]] === undefined) {
      tmp[arr[i]] = true
    } else if (tmp[arr[i]]) {
      tmp[arr[i]] = false
    }
  }

  const res = Object.keys(tmp).filter((key) => tmp[key] === true)
  return res[0]
}

// soal 4
function HowManyWords(input, query) {
  const res = []
  query.forEach((q) => {
    let num = 0
    for(let i = 0; i < input.length; i++) {
      if(q === input[i]) {
        num += 1
      }
    }
    res.push(num)
    num = 0
  })

  return res
}

module.exports = {
  reverse,
  findLongest,
  uniqueNumber,
  HowManyWords,
}
