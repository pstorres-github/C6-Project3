// VDR

import './development/networking/udpClient.js'

import {
    commandPORT,
    droneIP,
    localListenerIP,
    statePORT,
    testIP,
    videoPORT,
} from './development/networking/networkConfig.js'

import chalk from 'chalk'
import dgram from 'dgram'
import readline from 'readline'
import { send } from './development/networking/udpClient.js'

// ! VDR
// This is a demonstration command line interface that, --as yet,
// does nothing--   . But, hey, its not yet a website either. ¯\_(ツ)_/¯
// If you run with nodemon, you will get the input parroted back
// to you for some reason.

// TODO: 6/11 Backlog
// Next I will build a basic websockets interface to connect to the
// SDK and send basic commands, eg, `command command`. If I can power
// I'll call that a hello world. VDR

// TODO: 6/12 Backlog
// Tomorrow I'll implement all the switching cases for the commands
// in the SDK.I expect we should be able to fly by day's end. Proof
// of concept will be scripting a take off, fly a one-meter square,
// and land in the same place. VDR

// INIT TEST MODE FLAG
let testState = ''
let devMode = false
let message = 'foo'

// create an interface that will take input from the terminal
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function test(input) {
    switch (input) {
        case 'TEST TRUE':
        case 'test true':
            devMode = true
            testState = `\n${chalk.green('SAFE')}: Use ${chalk.green(
                'test false'
            )} to exit test mode.\n`
            console.log('\ndevMode:', devMode)
            console.log(testState)

            break
        case 'TEST FALSE':
        case 'test false':
            devMode = false
            testState = `\n${chalk.yellow('LIVE')}:`
            console.log('\ndevMode:', devMode)
            console.log(testState)
            break

        // IGNORE THIS FOR NOW

        // case 'TEST':
        // case 'test':
        //     console.log(
        //         `\nMalformed command: try ${chalk.green(
        //             'test true'
        //         )}, or ${chalk.green('test false')}`
        //     )
        //     break
        // case 'STATE':
        // case 'state':
        //     testState = `\n${chalk.yellow('LIVE')}:`
        //     send('state', statePORT, droneIP)
        //     console.log(testState, `'state' to ${droneIP}:${statePORT}`)
        //     break
        // case 'Q':
        // case 'q':
        // case 'EXIT':
        // case 'exit':
        // case 'QUIT':
        // case 'quit':
        //     process.exit(0)
        //     process.stdin.destroy()
        //     break

        default:
            break
    }
}

function handleInput(input) {
    switch (input) {
        case 'COMMAND':
        case 'command':
            if (devMode === true) {
                testState = `\n${chalk.green('SAFE')}:`
                send('command', statePORT, testIP)
                console.log(testState, `${input} to ${testIP}:${commandPORT}`)
                break
            } else if (devMode === false) {
                testState = `\n${chalk.yellow('LIVE')}:`
                send('command', commandPORT, droneIP)
                console.log(testState, `${input} to ${droneIP}:${commandPORT}`)
                break
            } else {
                console.log('Error: FLY')
                break
            }

        case 'TEST TRUE':
        case 'test true':
            test(input)
            break

        case 'TEST FALSE':
        case 'test false':
            test(input)
            break

        case 'FLY':
        case 'fly':
            if (devMode === true) {
                console.log(testState, `\nCommand: ${chalk.green('FLY')}.`)
                // TODO: send(fly)
            } else if (devMode === false) {
                console.log(
                    testState,
                    `\nCannot send command ${chalk.green(
                        'fly'
                    )} without first entering device SDK mode: ${chalk.green(
                        'command'
                    )}.`
                )
            } else {
                console.log('Error: FLY')
            }
            break

        case 'LAND':
        case 'land':
            if (devMode === true) {
                console.log(testState, `\nCommand: ${chalk.green('LAND')}.`)
                // TODO: send(land)
            } else if (devMode === false) {
                console.log(
                    testState,
                    `\nCannot send command ${chalk.green(
                        'land'
                    )} without first entering device SDK mode: ${chalk.green(
                        'command'
                    )}.`
                )
            } else {
                console.log('Error: LAND')
            }
            break

        case 'EMERGENCY':
        case 'emergency':
        case 'STOP':
        case 'stop':
        case 'KILL':
        case 'kill':
            if (devMode === true) {
                console.log(testState, `\nCommand: ${chalk.green('LAND')}.`)
                // TODO: send(emergency)
            } else if (devMode === false) {
                console.log(
                    testState,
                    `\nCannot send command ${chalk.green(
                        'land'
                    )} without first entering device SDK mode: ${chalk.green(
                        'command'
                    )}.`
                )
            } else {
                console.log('Error: KILL')
            }
            break

        case 'Q':
        case 'q':
        case 'EXIT':
        case 'exit':
        case 'QUIT':
        case 'quit':
            process.exit(0)
            // process.stdin.destroy()
            break

        case 'STATE':
        case 'state':
            if (devMode === true) {
                testState = `${chalk.green('SAFE')}:`
                console.log(
                    testState,
                    `\nSend 'state' to ${testIP}:${statePORT}`
                )
                send('state', statePORT, testIP)
                break
            } else if (devMode === false) {
                testState = `${chalk.yellow('LIVE')}:`
                send('state', statePORT, droneIP)
                console.log(telemetry)
                break
            } else {
                console.log('Error: STATE')
                break
            }

        case 'STATE2':
        case 'state2':
            if (devMode === true) {
                testState = `${chalk.green('SAFE')}:`
                console.log(
                    testState,
                    `\nSend 'state' to ${testIP}:${statePORT}`
                )
                send('state', statePORT, testIP)
                break
            } else if (devMode === false) {
                testState = `${chalk.yellow('LIVE')}:`
                send('state', statePORT, droneIP)
                console.log(testState, telemetryRaw)
                break
            } else {
                console.log('Error: STATE2')
                break
            }

        default:
            console.log('Error: command', input, 'not recognized.')
            break
    }
}

console.log(
    `\nInput a command: first, enter ${chalk.green(
        'command'
    )} to enter the device SDK API \nmode, then ` +
        `${chalk.green('fly')}, ` +
        `${chalk.green('land')}, ` +
        `${chalk.red('KILL')} in emergencies, ` +
        `or ${chalk.green('exit')} to quit.\n\n` +
        `Test mode will only stage commands: ${chalk.green(
            'test true'
        )} or ${chalk.green('test false')}.\nIn test mode, ${chalk.green(
            'state'
        )} will request drone state on port ${statePORT}.\n`
)
read.on('line', handleInput)

// **
// all that server jazz

// create the server
const flight = dgram.createSocket('udp4')

// if there's an error I want the world to know
flight.on('error', (error) => {
    console.log('ERR: ' + error)
})

// callback listener
flight.on('listening', () => {
    const address = flight.address()
    console.log(`Listening on port ${address.port}.\n`)
})

// inbound to CLI
flight.on('message', (message, info) => {
    telemetryRaw = Buffer.from(message).toString()
    // console.log(`MSG: ${info.address}:${info.port}: ${message}`)
    telemetry = telemetryConversion(telemetryRaw)
    return telemetry
})

flight.bind({
    address: '0.0.0.0',
    port: statePORT,
})

// convert telemetry

let telemetryRaw
let telemetry = []

function telemetryConversion(rawState) {
    let telemetry = rawState
        .toString()
        .split(';')
        .slice(0, -1)
        .map((x) => x.split(':'))
        .reduce((data, [key, value]) => {
            data[key] = value
            return data
        }, {})

    return telemetry
}

// TODO: reserved for future use
// export { telemetry }
