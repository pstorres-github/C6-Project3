const express = require('express')
const router = express.Router()
const Work_Order = require('../model/Work_Order')

router.get('/', checkAuthentication, async (req, res) => {
    let data = await Work_Order.find({})
    res.send(data)
})

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        console.log('not logged in')
        res.redirect('/')
    }
}

router.get('/:user', async (req, res, next) => {
    const userInfo = req.params.user
    console.log('userInfo:', userInfo)
    let userFlights
    try {
        userFlights = await Work_Order.find({ customerName: userInfo })
    } catch (err) {
        const error = 'Fetching items failed'
        return next(error)
    }
    if (!userFlights || userFlights.length === 0) {
        const error = 'Could not find flights for this user'
        return next(error)
    }
    console.log('userFlights:', userFlights)
    res.json({
        flights: userFlights.map((flights) =>
            flights.toObject({ getters: true })
        )
    })
})

router.get('/work_order/:id', async (req, res, next) => {
    const flightId = req.params.id
    console.log('flightId:', flightId)
    let flightById
    try {
        flightById = await Work_Order.findOne({ _id: flightId })
    } catch (err) {
        const error = 'Fetching work order failed'
        return next(error)
    }
    console.log('flightById:', flightById)
    res.json({
        flight: flightById.toObject({ getters: true })
    })
})

// POST method route
// Am I doing this right? NO

router.post('/create', async function (req, res) {
    // res.status(418).send("I'm a teapot.")
    console.log(`Create object endpoint OK. `)

    const newFlight = req.body

    try {
        // something happens
        let newEntry = new Work_Order(newFlight)
        await newEntry.save()
        res.send(newEntry)
    } catch (err) {
        // something bad happens
        console.log(err)
        res.sendStatus(500)
    }
})

// VDR

module.exports = router
