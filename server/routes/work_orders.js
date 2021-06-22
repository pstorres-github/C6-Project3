const express = require('express')
const router = express.Router()
const Work_Order = require('../model/Work_Order')

router.get('/', async (req, res) => {
    let data = await Work_Order.find({})
    res.send(data);
})

module.exports = router