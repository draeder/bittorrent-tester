#!/usr/bin/env node
const Tester = require('../')

let tester = new Tester(process.argv[2])
tester.on('result', result => {
  console.log('Good tracker?', result)
})