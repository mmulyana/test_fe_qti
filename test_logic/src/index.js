const { reverse, findLongest, uniqueNumber, HowManyWords } = require('./soal.js')

const soal1 = reverse('SUTNAUQ3')
console.log(soal1)

const soal2 = findLongest("Saya sangat senang mengerjakan soal algoritma dari PT Quantus Telematika")
console.log(soal2)

const soal3 = uniqueNumber(76529752690)
console.log(soal3)

const soal4 = HowManyWords(['xc', 'dz', 'bbb', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz'])
console.log(soal4)