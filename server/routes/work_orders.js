const express = require('express')
const router = express.Router()
const Work_Order = require('../model/Work_Order')

router.get('/', checkAuthentication , async (req, res) => {
    let data = await Work_Order.find({})
    res.send(data);
})

function checkAuthentication(req,res,next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        console.log('not logged in')
        res.redirect('/')
    }
}

module.exports = router