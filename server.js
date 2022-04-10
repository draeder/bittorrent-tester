const EventEmitter = require('events').EventEmitter
const fetch = require('node-fetch')
const crypto = require('crypto')

const Tester = function(tracker){
  let tester = this
  const events = new EventEmitter()
  tester.emit = events.emit.bind(events)
  tester.on = events.on.bind(events)
  tester.once = events.once.bind(events)
  tester.off = events.off.bind(events)
  
  let peerId = '-DE13F0-' + crypto.randomBytes(6).toString('hex')
  let hash = crypto.randomBytes(20).toString('hex')
  let port = 30210
  let uploaded = 1024 * 16
  let downloaded = 1024 * 16
    
  console.log('My peer ID:', peerId)
  
  let url = [
    tracker,
    '?info_hash=',
    encodeURI(hash),
    '&peer_id=',
    peerId,
    '&port=',
    port,
    '&uploaded=',
    uploaded,
    '&downloaded=',
    downloaded,
    '&compact=1'
  ].join('')
  
  console.log('Testing tracker:', url)
  
  fetch(url)
  .then(res => res)
  .then(res => {
    if(res.status != 200){
      tester.emit('result', false)
    } else {
      tester.emit('result', true)
    }
    return res.text()
  })
  .then(text => ()=>{})
  .catch(err => {
    tester.emit('result', false)
  })
  
  function encodeURI(hash) {
    return hash.replace(/.{2}/g, function (m) {
      var v = parseInt(m, 16)
      if (v <= 127) {
        m = encodeURIComponent(String.fromCharCode(v))
        if (m[0] === '%') {
          m = m.toLowerCase()
        }
      }
      else {
        m = '%' + m
      }
      return m
    })
  }
}

module.exports = Tester