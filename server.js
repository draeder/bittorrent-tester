let fetch = require('node-fetch')
let crypto = require('crypto')

let tracker = 'https://cerulean-skinny-lettuce.glitch.me/announce'
let peerId = '-DE13F0-' + crypto.randomBytes(6).toString('hex')
let hash = crypto.randomBytes(20).toString('hex')
let port = 30210
let uploaded = 1024 * 16
let downloaded = 1024 * 16

console.log(peerId)

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

console.log(url)

fetch(url)
.then(res => res)
.then(res => {
    console.log(res)
    if(res.status != 200){
        console.log('bad tracker')
    }
    return res.text()
})
.then(text => console.log(text))
.catch(err => console.log(err))

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