require ('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Route Requirements [Express Router]
const users = require('./routes/users')
const work_orders = require('./routes/work_orders')

// Middleware
app.use(express.json()) //JSON Parser
app.use(
  cors({
    origin: ["http://localhost:4444", "http://localhost:4445"], // <-- location of the react apps we're connecting to
    credentials: true,
  })
);

// Routes
app.use('/api/users', users)
app.use('/api/work_orders',work_orders)

//Set PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`)
})