const Tester = require('./')

let tester = new Tester('https://tracker.peer.ooo/announce')
tester.on('result', result => {
  console.log('Good tracker?', result)
})
 