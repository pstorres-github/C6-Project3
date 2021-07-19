import {
    commandPORT,
    droneIP,
    localListenerIP,
    statePORT,
    videoPORT,
} from './networkConfig.js'

import dgram from 'dgram'

// create client
const client = dgram.createSocket('udp4')

//
// ** THIS MIGHT HELP

export function int2ip(ipInt) {
    return (
        (ipInt >>> 24) +
        '.' +
        ((ipInt >> 16) & 255) +
        '.' +
        ((ipInt >> 8) & 255) +
        '.' +
        (ipInt & 255)
    )
}

export function ip2int(ip) {
    return (
        ip.split('.').reduce(function (ipInt, octet) {
            return (ipInt << 8) + parseInt(octet, 10)
        }, 0) >>> 0
    )
}

// THIS MAY NO LONGER HELP
//

// creating the connection is apparently as simple as this
const server = dgram.createSocket('udp4')

// if there's an error I want the world to know
server.on('error', (error) => {
    console.log('ERR: ' + error)
    // server.close()
})

// gimmie updates
client.on('message', (msg, info) => {
    console.log('Data received from server : ' + msg.toString())
    console.log(
        'Received %d bytes from %s:%d\n',
        msg.length,
        info.address,
        info.port
    )
})

// send a message

let message = 'hello world'
let testIP = '192.168.86.99'

export function send(message, port, ip) {
    server.send(Buffer.from(message), port, ip, (error) => {
        if (error) {
            console.log('SEND ERROR')
        } else {
            console.log('SUCCESS', message, ip, port, '\n')
        }
    })
    console.log('CLIENT OUTBOUND:', message)
}

let sol = '192.168.86.28'
let solPort = '8890'

send('bingo bongo', statePORT, sol)

// send('state2', statePORT, testIP)
// export defaults

setTimeout(() => {
    console.log('wait…')
}, 500)
// Kill after "x" milliseconds
setTimeout(() => {
    process.exit()
}, 2500)
