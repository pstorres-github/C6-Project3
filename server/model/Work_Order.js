require('./db')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const workOrderSchema = new Schema({
        customer: String,
        date: String,
        time: String,
        pilot: String,
        flight_plan: Array,
        flight_data: Array,
        analytics: {
            video: String
        }

},
        { strict: true, versionKey: false })

module.exports = mongoose.model('Work_Order', workOrderSchema, 'work_orders')