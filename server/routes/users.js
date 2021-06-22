const express = require('express')
const router = express.Router()
const User = require('../model/User')

router.get('/', async (req, res) => {
    let data = await User.find({})
    res.send(data);
})

module.exports = router