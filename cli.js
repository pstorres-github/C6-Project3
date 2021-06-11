const readline = require('readline')
const chalk = require('chalk')

// // VDR
// This is a demonstration command line interface that, as yet,
// does nothing. But, hey, its not yet a website either. ¯\_(ツ)_/¯
// If you run with nodemon, you will get the input parroted back
// to you for some reason.

// INIT TEST MODE FLAG
let testState = ''
let devMode = false

// create an interface that will take input from the terminal
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function test(input) {
    switch (input) {
        case 'test true':
            testState = `\n${chalk.green('SAFE')}: Try ${chalk.green(
                'test false'
            )} to exit test mode.`
            console.log(testState)
            break
        case 'test false':
            testState = `\n${chalk.yellow('LIVE')}:`
            console.log(testState)
            break
        case 'test':
            console.log(
                `\nMalformed command: try ${chalk.green(
                    'test true'
                )}, or ${chalk.green('test false')}`
            )
            break
        default:
            break
    }
}

function handleInput(input) {
    switch (input) {
        case 'test true':
            test(input)
            break
        case 'test false':
            test(input)
            break
        case 'test':
            test(input)
            break
        case 'command':
            console.log(testState, `\nSet ${chalk.green('COMMAND')} mode.`)
            devMode = true
            break
        case 'fly':
            if (devMode === true) {
                console.log(testState, `\nCommand: ${chalk.green('FLY')}.`)
                // sendAPI(fly)
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
        case 'land':
            if (devMode === true) {
                console.log(testState, `\nCommand: ${chalk.green('LAND')}.`)
                // sendAPI(land)
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
        case 'quit':
            process.exit(0)
            // process.stdin.destroy()
            break
        default:
            console.log('handleInput: default')
            break
    }
}

// // parrot function
// function output(input) {
//     console.log('You said:', input)
// }
// read.on('line', output)

console.log(
    `\nInput a command: first, enter ${chalk.green(
        'command'
    )} to enter the device SDK API \nmode, then ` +
        `${chalk.green('fly')}, ` +
        `${chalk.green('land')}, ` +
        `or ${chalk.red('quit')}.\n\n` +
        `Test mode will only stage commands: ${chalk.green(
            'test true'
        )} or ${chalk.green('test false')}.`
)
read.on('line', handleInput)
