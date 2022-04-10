# tracker-tester
 Tests whether or not a bittorrent tracker is responsive

# Usage
## Install
`npm i tracker-tester`

## Example
```js
const Tester = require('tracker-tester')

let tester = new Tester('https://tracker.peer.ooo/announce')
tester.on('result', result => {
  console.log('Good tracker?', result)
})
```